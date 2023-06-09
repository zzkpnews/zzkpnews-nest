import { GetBooksListItem } from '@/interface/api/get-books-list';
import { Controller, Get, Header, Query } from '@nestjs/common';
import { GetBooksListQueries } from './get-books-list.dto';
import { GetBooksListService } from './get-books-list.service';

@Controller('api/get-books-list')
export class GetBooksListAPIController {
  constructor(private readonly getBooksListService: GetBooksListService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getBooksList(
    @Query() booksListQueries: GetBooksListQueries,
  ): Promise<GetBooksListItem[]> {
    const books_list = await this.getBooksListService.getList({
      creatorId: booksListQueries.creator_id,
      timestampOffset: booksListQueries.timestamp_offset,
      count: booksListQueries.count,
    });
    return books_list;
  }
}
