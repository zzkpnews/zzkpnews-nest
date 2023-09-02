import { Module } from '@nestjs/common';
import { NewsListItemModule } from './news-list-item/news-list-item.module';
import { SearchListItemModule } from './search-list-item/search-list-item.module';
import { BooksListItemModule } from './book-list-item/book-list-item.module';
import { CreatorAllocationModule } from './creator-allocation/creator-allocation.module';

@Module({
  imports: [NewsListItemModule, SearchListItemModule, BooksListItemModule, CreatorAllocationModule],
  exports: [NewsListItemModule, SearchListItemModule, BooksListItemModule, CreatorAllocationModule],
})
export class ViewsModule {}
