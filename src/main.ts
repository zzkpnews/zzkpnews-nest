import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import program from 'commander';





async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3300);
}
bootstrap();
