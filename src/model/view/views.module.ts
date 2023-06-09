import { Module } from '@nestjs/common';
import { NewsListItemModule } from './news-list-item/news-list-item.module';
import { SearchListItemModule } from './search-list-item/search-list-item.module';
import { BooksListItemModule } from './book-list-item/book-list-item.module';

@Module({
  imports: [NewsListItemModule, SearchListItemModule, BooksListItemModule],
  exports: [NewsListItemModule, SearchListItemModule, BooksListItemModule],
})
export class ViewsModule {}
