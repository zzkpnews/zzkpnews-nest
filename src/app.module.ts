import { Module } from '@nestjs/common';
import { ApisModule } from './apis/apis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplatesModule } from './template/templates.module';

@Module({
  imports: [TemplatesModule, ApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
