import { GetBookListItem } from '@/interface/api/get-book-list';
import { Controller, Get, Header, Query } from '@nestjs/common';
import { GetBooksListQueries } from './get-book-list.dto';
import { GetBooksListService } from './get-book-list.service';

@Controller('api/get-books-list')
export class GetBooksListAPIController {
  constructor(private readonly getBooksListService: GetBooksListService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getBooksList(
    @Query() booksListQueries: GetBooksListQueries,
  ): Promise<GetBookListItem[]> {
    const books_list = await this.getBooksListService.getList({
      creatorId: booksListQueries.creator_id,
      timestampStart: booksListQueries.timestamp_start,
      timestampEnd: booksListQueries.timestamp_end,
      pageSize: booksListQueries.page_size,
      pageNum: booksListQueries.page_num,
    });
    return books_list;
  }
}
