import { GetArticleAPIContent } from '@/interface/public-api/get-article';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Param, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ArticleManageAPIService } from './logger.service';
import { AuthGuard } from '@/rc/guard/user-auth.guard';
import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';

@Controller('private-api/logger')
@UseFilters(APIExceptionFilter)
export class ArticleManageAPIController {
  constructor(private readonly articleManageAPIService: ArticleManageAPIService) {}

  @Get(':news_id')
  @UseInterceptors(APIInterceptor<GetArticleAPIContent[]>)
  @Header('Access-Control-Allow-Origin', '*')
  async getLogsList(@Param('news_id') news_id: string): Promise<GetArticleAPIContent> {
    return await this.articleManageAPIService.get(news_id);
  }

  @Post('/read')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<GetArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async deleteLogs(@Param('news_id') news_id: string): Promise<string> {
    console.log('ui');
    return 'hi';
  }
}
