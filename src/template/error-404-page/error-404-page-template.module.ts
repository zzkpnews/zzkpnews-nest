import { Error404PageTemplateController } from './error-404-page-template.controller';
import { Error404PageTemplateService } from './error-404-page-template.service';
import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  controllers: [Error404PageTemplateController],
  providers: [Error404PageTemplateService],
  exports: [Error404PageTemplateService],
})
export class Error404PageTemplateModule {}
