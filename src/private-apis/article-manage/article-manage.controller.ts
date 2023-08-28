import { API_STATUS_CODE } from '@/constant/api-status-code';
import {
  AddArticleAPIContent,
  ArticleLockerAPIContent,
  DeleteArticleAPIContent,
  UpdateArticleAPIContent,
} from '@/interface/private-api/article-manage';
import { APIException } from '@/rc/exception/api.exception';
import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';
import { CreatorAuthGuard } from '@/rc/guard/user-auth.guard';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { CreatorAuthTokenPayload } from '@/types/token-payload';
import { Body, Controller, Header, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubmitArticleDTO } from './article-manage.dto';
import { ArticleManageAPIService } from './article-manage.service';

@Controller('private-api/article-manage')
@UseFilters(APIExceptionFilter)
export class ArticleManageAPIController {
  constructor(private readonly articleManageAPIService: ArticleManageAPIService) {}

  @Post('/add')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<AddArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async add(@Body() target: SubmitArticleDTO, @Req() request: Request): Promise<AddArticleAPIContent> {
    const tokenPayload: CreatorAuthTokenPayload = request['payload'];
    const creatorId = tokenPayload.id;
    return await this.articleManageAPIService.add(
      tokenPayload,
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

  @Post('/update/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<AddArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async update(
    @Param() newsId: string,
    @Body() target: SubmitArticleDTO,
    @Req() request: Request,
  ): Promise<UpdateArticleAPIContent> {
    const tokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.update(
      tokenPayload,
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
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<ArticleLockerAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async close(@Param('news_id') newsId: string): Promise<ArticleLockerAPIContent> {
    return await this.articleManageAPIService.locker(newsId, 'close');
  }

  @Post('/unclose/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<ArticleLockerAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async unclose(@Param('news_id') newsId: string): Promise<ArticleLockerAPIContent> {
    return await this.articleManageAPIService.locker(newsId, 'unclose');
  }

  @Post('/delete/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<DeleteArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async delete(@Param('news_id') newsId: string): Promise<DeleteArticleAPIContent> {
    return await this.articleManageAPIService.delete(newsId);
  }

  @Post('/mark/home-hot/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<DeleteArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async markToHomeHot(@Param('news_id') newsId: string): Promise<DeleteArticleAPIContent> {
    return await this.articleManageAPIService.delete(newsId);
  }

  @Post('/mark/section-hot/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<DeleteArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async markToSectionHot(@Param('news_id') newsId: string): Promise<DeleteArticleAPIContent> {
    return await this.articleManageAPIService.delete(newsId);
  }

  @Post('/mark/creator-hot/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<DeleteArticleAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async markToCreatorHot(@Param('news_id') newsId: string): Promise<DeleteArticleAPIContent> {
    return await this.articleManageAPIService.delete(newsId);
  }
}
