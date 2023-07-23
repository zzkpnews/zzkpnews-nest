import { GetBookListAPIContent } from '@/interface/api/get-book-list';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Query, UseInterceptors } from '@nestjs/common';
import { GetBooksListQueries } from './get-book-list.dto';
import { GetBooksListService } from './get-book-list.service';

@Controller('api/get-book-list')
export class GetBooksListAPIController {
  constructor(private readonly getBooksListService: GetBooksListService) {}

  @Get()
  @UseInterceptors(APIInterceptor<GetBookListAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async getBooksList(@Query() booksListQueries: GetBooksListQueries): Promise<GetBookListAPIContent> {
    return await this.getBooksListService.getList({
      creatorId: booksListQueries.creator_id,
      timestampStart: booksListQueries.timestamp_start,
      timestampEnd: booksListQueries.timestamp_end,
      pageSize: booksListQueries.page_size,
      pageNum: booksListQueries.page_num,
    });
  }
}
