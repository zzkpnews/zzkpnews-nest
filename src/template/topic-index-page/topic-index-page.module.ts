import { Module } from '@nestjs/common';
import { TopicIndexPageTemplateService } from './topic-index-page.service';
import { TopicIndexPageTemplateController } from './topic-index-page.controller';
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
  controllers: [TopicIndexPageTemplateController],
  providers: [TopicIndexPageTemplateService],
  exports: [TopicIndexPageTemplateService],
})
export class TopicIndexPageTemplateModule {}
