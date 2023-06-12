import { NewsListItemModule } from '@/model/view/news-list-item/news-list-item.module';
import { Module } from '@nestjs/common';
import { GetNewsListService as GetNewsListAPIService } from './get-news-list.service';
import { GetNewsListAPIController } from './get-news-list.controller';

@Module({
  imports: [NewsListItemModule],
  providers: [GetNewsListAPIService],
  controllers: [GetNewsListAPIController],
  exports: [GetNewsListAPIService],
})
export class GetNewsListAPIModule {}
