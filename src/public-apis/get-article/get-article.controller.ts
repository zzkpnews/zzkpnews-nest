import { GetArticleAPIContent } from '@/interface/api/get-article';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Param, UseInterceptors } from '@nestjs/common';
import { GetArticleAPIService } from './get-article.service';

@Controller('public-api/get-article')
export class GetArticleAPIController {
  constructor(private readonly getArticleAPIService: GetArticleAPIService) {}

  @Get(':news_id')
  @UseInterceptors(APIInterceptor<GetArticleAPIContent[]>)
  @Header('Access-Control-Allow-Origin', '*')
  async getArticle(@Param('news_id') news_id: string): Promise<GetArticleAPIContent> {
    return await this.getArticleAPIService.get(news_id);
  }
}
