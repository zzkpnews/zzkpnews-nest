import { Module } from '@nestjs/common';
import { HomePageTemplateService } from './home-page-template.service';
import { HomePageTemplateController } from './home-page-template.controller';

@Module({
  controllers: [HomePageTemplateController],
  providers: [HomePageTemplateService],
})
export class HomePageTemplateModule {}
