import { GetBookAPI } from '@/interface/api/get-book';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Param, UseInterceptors } from '@nestjs/common';
import { GetBookAPIService } from './get-book.service';

@Controller('public-api/get-creator')
export class GetBookAPIController {
  constructor(private readonly getBookAPIService: GetBookAPIService) {}

  @Get(':creator_id')
  @UseInterceptors(APIInterceptor<GetBookAPI[]>)
  @Header('Access-Control-Allow-Origin', '*')
  async getArticle(@Param('book_id') book_id: string): Promise<GetBookAPI> {
    return await this.getBookAPIService.get(book_id);
  }
}
