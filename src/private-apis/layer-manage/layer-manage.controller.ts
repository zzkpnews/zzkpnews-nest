import { GetArticleAPIContent } from '@/interface/public-api/get-article';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Param, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ArticleManageAPIService } from './layer-manage.service';
import { CreatorAuthGuard } from '@/rc/guard/user-auth.guard';
import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';

@Controller('private-api/article-manage')
@UseFilters(APIExceptionFilter)
export class ArticleManageAPIController {
  constructor(private readonly articleManageAPIService: ArticleManageAPIService) {}

  @Get(':news_id')
  @UseInterceptors(APIInterceptor<GetArticleAPIContent[]>)
  @Header('Access-Control-Allow-Origin', '*')
  async newArticle(@Param('news_id') news_id: string): Promise<GetArticleAPIContent> {
    return await this.articleManageAPIService.get(news_id);
  }

  @Post('/read')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<GetArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async readArticle(@Param('news_id') news_id: string): Promise<string> {
    console.log('ui');
    return 'hi';
  }

  @Get(':news_id')
  @UseInterceptors(APIInterceptor<GetArticleAPIContent[]>)
  @Header('Access-Control-Allow-Origin', '*')
  async updateArticle(@Param('news_id') news_id: string): Promise<GetArticleAPIContent> {
    return await this.articleManageAPIService.get(news_id);
  }

  @Get(':news_id')
  @UseInterceptors(APIInterceptor<GetArticleAPIContent[]>)
  @Header('Access-Control-Allow-Origin', '*')
  async deleteArticle(@Param('news_id') news_id: string): Promise<GetArticleAPIContent> {
    return await this.articleManageAPIService.get(news_id);
  }
}
