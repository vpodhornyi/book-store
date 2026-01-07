import type { Request } from 'express';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { IncomingMessage, ServerResponse } from 'node:http';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',
        genReqId: (req: Request) => req.requestId,
        customProps: (req: Request) => ({
          requestId: req.requestId,
        }),
        serializers: {
          req(req: IncomingMessage) {
            const r = req as IncomingMessage & {
              id?: string;
              method?: string;
              url?: string;
            };

            return {
              id: r.id,
              method: r.method,
              url: r.url,
            };
          },
          res(res: ServerResponse) {
            return {
              statusCode: res.statusCode,
            };
          },
        },
        transport:
          process.env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  translateTime: 'HH:MM:ss',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpExceptionFilter],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
