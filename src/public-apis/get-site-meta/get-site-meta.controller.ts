import { GetSiteMetaAPI } from '@/interface/api/get-site-meta';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Param, UseInterceptors } from '@nestjs/common';
import { GetSiteMetaAPIService } from './get-site-meta.service';

@Controller('public-api/get-site-meta')
export class GetSiteMetaAPIController {
  constructor(private readonly getSiteMetaAPIService: GetSiteMetaAPIService) {}

  @Get()
  @UseInterceptors(APIInterceptor<GetSiteMetaAPI>)
  @Header('Access-Control-Allow-Origin', '*')
  async getArticle(): Promise<GetSiteMetaAPI> {
    return await this.getSiteMetaAPIService.get();
  }
}
