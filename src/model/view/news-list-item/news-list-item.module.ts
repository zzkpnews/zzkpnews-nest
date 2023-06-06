import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { NewsListItemProviders } from './news-list-item.providers';
import { NewsListItem } from './news-list-item.view';

@Module({
  imports: [DatabaseModule],
  providers: [NewsListItem, ...NewsListItemProviders],
  exports: [NewsListItem, ...NewsListItemProviders],
})
export class NewsListModule {}
