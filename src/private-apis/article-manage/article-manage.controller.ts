import { APIExceptionFilter } from '@/rc/filter/api-exception.filter';
import { CreatorAuthGuard, SuperAuthGuard } from '@/rc/guard/user-auth.guard';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { CreatorAuthTokenPayload, SuperAuthTokenPayload } from '@/types/token-payload';
import { Body, Controller, Header, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubmitArticleDTO } from './article-manage.dto';
import { ArticleManageAPIService } from './article-manage.service';

@Controller('private-api/article-manage')
@UseFilters(APIExceptionFilter)
export class ArticleManageAPIController {
  constructor(private readonly articleManageAPIService: ArticleManageAPIService) {}

  @Post('/creator/add')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async addByCreator(@Body() target: SubmitArticleDTO, @Req() request: Request): Promise<void> {
    const tokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.addByCreator(tokenPayload, target);
  }

  @Post('/creator/update/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async updateByCreator(
    @Param() newsId: string,
    @Body() target: SubmitArticleDTO,
    @Req() request: Request,
  ): Promise<void> {
    const tokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.updateByCreator(tokenPayload, newsId, target);
  }

  @Post('/creator/close/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async closeByCreator(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.setupLockByCreator(authTokenPayload, newsId, 'close');
  }

  @Post('/creator/unclose/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async uncloseByCreator(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.setupLockByCreator(authTokenPayload, newsId, 'unclose');
  }

  @Post('/creator/delete/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async deleteByCreator(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.deleteByCreator(authTokenPayload, newsId);
  }

  @Post('/creator/mark/creator-hot/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async markToCreatorHotByCreator(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.setupCreatorHotByCreator(authTokenPayload, newsId, 'mark');
  }

  @Post('/creator/unmark/creator-hot/:news_id')
  @UseGuards(CreatorAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async unmarkOutCreatorHotByCreator(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: CreatorAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.setupCreatorHotByCreator(authTokenPayload, newsId, 'unmark');
  }

  @Post('/super/mark/home-hot/:news_id')
  @UseGuards(SuperAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async markToHomeHotBySuper(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: SuperAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.setupHomeHotBySuper(authTokenPayload, newsId, 'mark');
  }

  @Post('/super/unmark/home-hot/:news_id')
  @UseGuards(SuperAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async unmarkOutHomeHotBySuper(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: SuperAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.setupHomeHotBySuper(authTokenPayload, newsId, 'unmark');
  }

  @Post('/super/mark/section-hot/:news_id')
  @UseGuards(SuperAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async markToSectionHotBySuper(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: SuperAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.setupSectionHotBySuper(authTokenPayload, newsId, 'mark');
  }

  @Post('/super/unmark/section-hot/:news_id')
  @UseGuards(SuperAuthGuard)
  @UseInterceptors(APIInterceptor<void>)
  @Header('Access-Control-Allow-Origin', '*')
  async unmarkOutSectionHotBySuper(@Param('news_id') newsId: string, @Req() request: Request): Promise<void> {
    const authTokenPayload: SuperAuthTokenPayload = request['payload'];
    return await this.articleManageAPIService.setupSectionHotBySuper(authTokenPayload, newsId, 'unmark');
  }
}
