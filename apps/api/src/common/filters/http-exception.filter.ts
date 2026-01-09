import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

import { type ApiError } from '@repo/contracts';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const isHttp = exception instanceof HttpException;

    const statusCode = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorName = isHttp ? exception.name : 'InternalServerError';

    const message = isHttp
      ? (() => {
          const r = exception.getResponse();
          if (typeof r === 'string') return r;
          if (typeof r === 'object' && r && 'message' in r) {
            const m = r.message;
            return Array.isArray(m) ? m.join(', ') : String(m);
          }
          return exception.message;
        })()
      : 'Internal server error';

    // Log (stack only in logs, not in response)
    if (statusCode >= 500) {
      this.logger.error(
        {
          requestId: req.requestId,
          method: req.method,
          url: req.originalUrl ?? req.url,
          statusCode,
          errorName,
          err: exception, // pino will serialize stack
        },
        'Unhandled exception',
      );
    } else {
      this.logger.warn(
        {
          requestId: req.requestId,
          method: req.method,
          url: req.originalUrl ?? req.url,
          statusCode,
          errorName,
        },
        'Request failed',
      );
    }

    const body: ApiError = {
      requestId: req.requestId,
      statusCode,
      error: errorName,
      message,
      path: req.originalUrl ?? req.url,
      timestamp: new Date().toISOString(),
    } satisfies ApiError;

    // Client response (no stack)
    res.status(statusCode).json(body);
  }
}
