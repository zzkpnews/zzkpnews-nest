import { Module } from '@nestjs/common';
import { NewsListItemModule } from './news-list-item/news-list-item.module';
import { SearchResultItemModule } from './search-result-item/search-result-item.module';

@Module({
  imports: [NewsListItemModule, SearchResultItemModule],
  exports: [NewsListItemModule, SearchResultItemModule],
})
export class ViewsModule {}
