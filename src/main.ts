import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { printLOGO } from './utils/software-info';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  printLOGO();
  await app.listen(3300);
}
bootstrap();
