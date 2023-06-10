import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { BookListItem } from './book-list-item.view';
import { BookListItemProviders } from './book-list-item.providers';

@Module({
  imports: [DatabaseModule],
  providers: [BookListItem, ...BookListItemProviders],
  exports: [BookListItem, ...BookListItemProviders],
})
export class BooksListItemModule {}
