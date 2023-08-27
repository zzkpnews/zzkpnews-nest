import { GetCreatorAPIContent } from '@/interface/public-api/get-creator';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Param, UseInterceptors } from '@nestjs/common';
import { GetCreatorAPIService } from './get-creator.service';

@Controller('public-api/get-creator')
export class GetCreatorAPIController {
  constructor(private readonly getCreatorAPIService: GetCreatorAPIService) {}

  @Get(':creator_id')
  @UseInterceptors(APIInterceptor<GetCreatorAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async getArticle(@Param('creator_id') creator_id: string): Promise<GetCreatorAPIContent> {
    return await this.getCreatorAPIService.get(creator_id);
  }
}
