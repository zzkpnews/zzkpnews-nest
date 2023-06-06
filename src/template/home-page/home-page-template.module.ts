import { Module } from '@nestjs/common';
import { HomePageTemplateService } from './home-page-template.service';
import { HomePageTemplateController } from './home-page-template.controller';
import { EntityModule } from '@/model/entity/entities.module';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { NewsListModule } from '@/model/view/news-list-item/news-list-item.module';

@Module({
  imports: [
    EntityModule,
    TemplateUtilsModule,
    ObjectStorageModule,
    NewsListModule,
  ],
  controllers: [HomePageTemplateController],
  providers: [HomePageTemplateService],
  exports: [HomePageTemplateService],
})
export class HomePageTemplateModule {}
