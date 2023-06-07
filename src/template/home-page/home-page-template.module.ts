import { EntityModule } from '@/model/entity/entities.module';
import { HomePageTemplateService } from './home-page-template.service';
import { Module } from '@nestjs/common';
import { NewsListItemModule } from '@/model/view/news-list-item/news-list-item.module';
import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { TemplateUtilsModule } from '../utils/template-utils.module';

@Module({
  imports: [
    EntityModule,
    TemplateUtilsModule,
    ObjectStorageModule,
    NewsListItemModule,
  ],
  providers: [HomePageTemplateService],
  exports: [HomePageTemplateService],
})
export class HomePageTemplateModule {}