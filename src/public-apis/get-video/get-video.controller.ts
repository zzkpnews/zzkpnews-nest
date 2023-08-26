import { GetVideoAPI } from '@/interface/api/get-video';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Param, UseInterceptors } from '@nestjs/common';
import { GetVideoAPIService } from './get-video.service';

@Controller('public-api/get-video')
export class GetVideoAPIController {
  constructor(private readonly getVideoAPIService: GetVideoAPIService) {}

  @Get(':news_id')
  @UseInterceptors(APIInterceptor<GetVideoAPI[]>)
  @Header('Access-Control-Allow-Origin', '*')
  async getArticle(@Param('news_id') news_id: string): Promise<GetVideoAPI> {
    return await this.getVideoAPIService.get(news_id);
  }
}
