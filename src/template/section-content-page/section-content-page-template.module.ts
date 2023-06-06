import { SectionContentPageTemplateController } from './section-content-page-template.controller';
import { SectionContentPageTemplateService } from './section-content-page-template.service';
import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  controllers: [SectionContentPageTemplateController],
  providers: [SectionContentPageTemplateService],
  exports: [SectionContentPageTemplateService],
})
export class SectionContentPageTemplateModule {}
