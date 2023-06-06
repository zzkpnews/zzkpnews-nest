import { Error500PageTemplateController } from './error-500-page-template.controller';
import { Error500PageTemplateService } from './error-500-page-template.service';
import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  controllers: [Error500PageTemplateController],
  providers: [Error500PageTemplateService],
  exports: [Error500PageTemplateService],
})
export class Error500PageTemplateModule {}
