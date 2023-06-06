import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntityModule } from './model/entity/entities.module';
import { TemplatesModule } from './template/templates.module';

@Module({
  imports: [EntityModule, TemplatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
