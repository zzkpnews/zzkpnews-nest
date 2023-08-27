import { GetSiteMetaAPIContent } from '@/interface/public-api/get-site-meta';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, UseInterceptors } from '@nestjs/common';
import { GetSiteMetaAPIService } from './get-site-meta.service';

@Controller('public-api/get-site-meta')
export class GetSiteMetaAPIController {
  constructor(private readonly getSiteMetaAPIService: GetSiteMetaAPIService) {}

  @Get()
  @UseInterceptors(APIInterceptor<GetSiteMetaAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async getArticle(): Promise<GetSiteMetaAPIContent> {
    return await this.getSiteMetaAPIService.get();
  }
}
