import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { NewsListItemModule } from '@/model/view/news-list-item/news-list-item.module';
import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { SectionIndexPageTemplateService } from './section-index-page.service';
import { TemplateUtilsModule } from '../utils/template-utils.module';

@Module({
  imports: [
    EntityModule,
    TemplateUtilsModule,
    ObjectStorageModule,
    NewsListItemModule,
  ],
  providers: [SectionIndexPageTemplateService],
  exports: [SectionIndexPageTemplateService],
})
export class SectionIndexPageTemplateModule {}
