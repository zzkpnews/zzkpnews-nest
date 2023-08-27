import {
  AddArticleAPIContent,
  ArticleLockerAPIContent,
  DeleteArticleAPIContent,
  UpdateArticleAPIContent,
} from '@/interface/private-api/article-manage';
import { GetArticleAPIContent } from '@/interface/public-api/get-article';
import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';
import { AuthGuard } from '@/rc/guard/user-auth.guard';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Body, Controller, Header, Param, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubmitArticleDTO } from './article-manage.dto';
import { ArticleManageAPIService } from './article-manage.service';

@Controller('private-api/article-manage')
@UseFilters(APIExceptionFilter)
export class ArticleManageAPIController {
  constructor(private readonly articleManageAPIService: ArticleManageAPIService) {}

  @Post('/add')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<AddArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async add(@Body() target: SubmitArticleDTO): Promise<AddArticleAPIContent> {
    return await this.articleManageAPIService.add(
      target.title,
      target.subtitle,
      target.leadTitle,
      target.citation,
      target.coverImage,
      target.keywords,
      target.creatorId,
      target.belongingSectionId,
      target.belongingTopicId,
      target.author,
      target.editor,
      target.origin,
      target.originUrl,
      target.content,
    );
  }

  @Post('/update/:news_id')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<AddArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async update(@Param() newsId: string, @Body() target: SubmitArticleDTO): Promise<UpdateArticleAPIContent> {
    return await this.articleManageAPIService.update(
      newsId,
      target.title,
      target.subtitle,
      target.leadTitle,
      target.citation,
      target.coverImage,
      target.keywords,
      target.belongingSectionId,
      target.belongingTopicId,
      target.author,
      target.editor,
      target.origin,
      target.originUrl,
      target.content,
    );
  }

  @Post('/close/:news_id')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<ArticleLockerAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async close(@Param('news_id') newsId: string): Promise<ArticleLockerAPIContent> {
    return await this.articleManageAPIService.locker(newsId, 'close');
  }

  @Post('/unclose/:news_id')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<ArticleLockerAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async unclose(@Param('news_id') newsId: string): Promise<ArticleLockerAPIContent> {
    return await this.articleManageAPIService.locker(newsId, 'unclose');
  }

  @Post('/delete/:news_id')
  @UseGuards(AuthGuard)
  @UseInterceptors(APIInterceptor<GetArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async delete(@Param('news_id') newsId: string): Promise<DeleteArticleAPIContent> {
    return await this.articleManageAPIService.delete(newsId);
  }
}
