import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from 'common/filters/global-exception.filter';
import { AppLogger } from 'common/services/logger.service';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const logger = app.get(AppLogger);
  HttpExceptionFactory.configureLogger(logger);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}

async function run() {
  try {
    await bootstrap();
  } catch (error) {
    console.error(error);
  }
}

void run();
