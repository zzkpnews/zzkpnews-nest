import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { SectionIndexPageTemplateService } from './section-index-page.service';

@Module({
  imports: [EntityModule, TemplateUtilsModule, ObjectStorageModule, ViewsModule],
  providers: [SectionIndexPageTemplateService],
  exports: [SectionIndexPageTemplateService],
})
export class SectionIndexPageTemplateModule {}
