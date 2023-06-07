import { NewsListItemModule } from '@/model/view/news-list-item/news-list-item.module';
import { Module } from '@nestjs/common';
import { NewsListService } from './news-list.service';

@Module({
  imports: [NewsListItemModule],
  providers: [NewsListService],
  exports: [NewsListService],
})
export class SearchModule {}
