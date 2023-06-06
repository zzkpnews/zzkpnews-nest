import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { NewsListProviders } from './news-list-item.providers';
import { NewsListItem } from './news-list-item.view';

@Module({
  imports: [DatabaseModule],
  providers: [NewsListItem, ...NewsListProviders],
  exports: [NewsListItem, ...NewsListProviders],
})
export class NewsListModule {}
