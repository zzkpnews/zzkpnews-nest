import { Module } from '@nestjs/common';
import { NewsListItemModule } from './news-list-item/news-list-item.module';
import { SearchResultItemModule } from './search-result-item/search-result-item.module';
import { BooksListItemModule } from './books-list-item/books-list-item.module';

@Module({
  imports: [NewsListItemModule, SearchResultItemModule, BooksListItemModule],
  exports: [NewsListItemModule, SearchResultItemModule, BooksListItemModule],
})
export class ViewsModule {}
