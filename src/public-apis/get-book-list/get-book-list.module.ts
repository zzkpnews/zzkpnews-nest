import { BooksListItemModule } from '@/model/view/book-list-item/book-list-item.module';
import { Module } from '@nestjs/common';
import { GetBooksListAPIController } from './get-book-list.controller';
import { GetBooksListService } from './get-book-list.service';

@Module({
  imports: [BooksListItemModule],
  providers: [GetBooksListService],
  controllers: [GetBooksListAPIController],
  exports: [GetBooksListService],
})
export class GetBooksListAPIModule {}
