import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { ZodError } from 'zod';
import { ZodValidationException } from 'nestjs-zod';
import { Prisma } from '@prisma/client';

import { type ApiError } from '@repo/contracts';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const statusCode: number = this.getStatus(exception);
    const message: string = this.getMessage(exception);
    const errorName: string = this.getErrorName(exception);

    this.logError(req, statusCode, errorName, exception);

    const body: ApiError = {
      requestId: req.requestId,
      statusCode,
      error: errorName,
      message,
      path: req.originalUrl ?? req.url,
      timestamp: new Date().toISOString(),
    };

    res.status(statusCode).json(body);
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) return exception.getStatus();
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          return HttpStatus.CONFLICT;
        case 'P2025':
          return HttpStatus.NOT_FOUND;
        case 'P2003':
          return HttpStatus.CONFLICT;
        default:
          return HttpStatus.BAD_REQUEST;
      }
    }

    if (exception instanceof ZodValidationException) {
      return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorName(exception: unknown): string {
    if (exception instanceof HttpException) return exception.name;
    if (exception instanceof Prisma.PrismaClientKnownRequestError)
      return 'DatabaseError';
    if (exception instanceof ZodValidationException) return 'ValidationError';
    return 'InternalServerError';
  }

  private getMessage(exception: unknown): string {
    if (exception instanceof ZodValidationException) {
      const zodError = exception.getZodError() as ZodError;

      try {
        const parsed = JSON.parse(zodError.message) as Array<{
          message: string;
        }>;

        return parsed[0].message;
      } catch {
        return zodError.message || 'Validation failed';
      }
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const target = (exception.meta?.modelName as string) || 'Entity';

      switch (exception.code) {
        case 'P2002':
          return `${target} already exists`;
        case 'P2025':
          return `${target} not found`;
        case 'P2003':
          return `${target} is referenced by other records`;
        default:
          return `Database error (${exception.code}) on ${target}`;
      }
    }

    if (exception instanceof HttpException) {
      const r = exception.getResponse();
      if (typeof r === 'string') return r;
      if (typeof r === 'object' && r && 'errors' in r) {
        const m = r.errors as { errors: [string] };
        return m.errors[0] || 'Validation failed';
      }
      return exception.message;
    }
    return 'Internal server error';
  }

  private logError(
    req: Request,
    statusCode: number,
    errorName: string,
    exception: unknown,
  ) {
    const logData = {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode,
      errorName,
    };

    if (statusCode >= 500) {
      this.logger.error({ ...logData, err: exception }, 'Unhandled exception');
    } else {
      this.logger.warn(logData, 'Request failed');
    }
  }
}
