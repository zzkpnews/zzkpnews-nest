import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { PaperPageTemplateService } from './paper-page-template.service';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  providers: [PaperPageTemplateService],
  exports: [PaperPageTemplateService],
})
export class PaperPageTemplateModule {}
