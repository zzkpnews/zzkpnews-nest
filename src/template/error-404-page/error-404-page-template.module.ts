import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { Error404PageTemplateService } from './error-404-page-template.service';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  providers: [Error404PageTemplateService],
  exports: [Error404PageTemplateService],
})
export class Error404PageTemplateModule {}
