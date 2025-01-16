import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? port);
  Logger.log(`running Server on Port ${port}`);
}
bootstrap();
