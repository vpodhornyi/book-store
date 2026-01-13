import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ZodValidationPipe, cleanupOpenApiDoc } from 'nestjs-zod';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: process.env.NODE_ENV === 'production',
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(app.get(HttpExceptionFilter));
  app.useGlobalPipes(new ZodValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Book store example')
    .setDescription('The book store API description')
    .setVersion('1.0')
    .addTag('bookstore')
    .addBearerAuth()
    .addCookieAuth('refreshToken')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  cleanupOpenApiDoc(document);

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
