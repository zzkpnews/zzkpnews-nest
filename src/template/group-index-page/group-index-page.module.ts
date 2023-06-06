import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { NewsListModule } from '@/model/view/news-list-item/news-list-item.module';
import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { GroupIndexPageTemplateService } from './group-index-page.service';
import { TemplateUtilsModule } from '../utils/template-utils.module';

@Module({
  imports: [
    EntityModule,
    TemplateUtilsModule,
    ObjectStorageModule,
    NewsListModule,
  ],

  providers: [GroupIndexPageTemplateService],
  exports: [GroupIndexPageTemplateService],
})
export class GroupIndexPageTemplateModule {}
