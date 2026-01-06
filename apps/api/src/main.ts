import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Book store example')
    .setDescription('The book store API description')
    .setVersion('1.0')
    .addTag('bookstore')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
