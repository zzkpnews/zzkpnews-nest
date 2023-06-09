import { BooksListItemModule } from '@/model/view/books-list-item/books-list-item.module';
import { Module } from '@nestjs/common';
import { GetBooksListAPIController } from './get-books-list.controller';
import { GetBooksListService } from './get-books-list.service';

@Module({
  imports: [BooksListItemModule],
  providers: [GetBooksListService],
  controllers: [GetBooksListAPIController],
  exports: [GetBooksListService],
})
export class GetBooksListAPIModule {}
