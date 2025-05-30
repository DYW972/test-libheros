import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

async function run() {
  try {
    await bootstrap();
  } catch (error) {
    console.error(error);
  }
}

void run();
