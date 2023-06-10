import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { Error500PageTemplateService } from './error-500-page-template.service';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  providers: [Error500PageTemplateService],
  exports: [Error500PageTemplateService],
})
export class Error500PageTemplateModule {}
