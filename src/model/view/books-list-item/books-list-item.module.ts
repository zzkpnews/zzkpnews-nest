import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { BooksListItem } from './books-list-item.view';
import { BooksListItemProviders } from './books-list-item.providers';

@Module({
  imports: [DatabaseModule],
  providers: [BooksListItem, ...BooksListItemProviders],
  exports: [BooksListItem, ...BooksListItemProviders],
})
export class BooksListItemModule {}
