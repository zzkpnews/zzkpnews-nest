import { Module } from '@nestjs/common';
import { SectionIndexPageTemplateService } from './section-index-page.service';
import { SectionIndexPageTemplateController } from './section-index-page.controller';
import { EntityModule } from '@/model/entity/entities.module';
import { NewsListModule } from '@/model/view/news-list-item/news-list-item.module';
import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { TemplateUtilsModule } from '../utils/template-utils.module';

@Module({
  imports: [
    EntityModule,
    TemplateUtilsModule,
    ObjectStorageModule,
    NewsListModule,
  ],
  controllers: [SectionIndexPageTemplateController],
  providers: [SectionIndexPageTemplateService],
  exports: [SectionIndexPageTemplateService],
})
export class SectionIndexPageTemplateModule {}
