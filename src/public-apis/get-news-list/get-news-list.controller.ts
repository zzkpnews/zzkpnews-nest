import { GetNewsListQueries } from '@/public-apis/get-news-list/get-news-list.dto';
import { GetNewsListAPIContent } from '@/interface/api/get-news-list';
import { APIInterceptor } from '@/rc/interceptor/api-response.interceptor';
import { Controller, Get, Header, Query, UseInterceptors } from '@nestjs/common';
import { GetNewsListService } from './get-news-list.service';

@Controller('api/get-news-list')
export class GetNewsListAPIController {
  constructor(private readonly getNewsListService: GetNewsListService) {}

  @Get()
  @UseInterceptors(APIInterceptor<GetNewsListAPIContent>)
  @Header('Access-Control-Allow-Origin', '*')
  async getNewsList(@Query() newsListQueries: GetNewsListQueries): Promise<GetNewsListAPIContent> {
    const news_list = await this.getNewsListService.getList({
      sectionId: newsListQueries.section_id,
      creatorId: newsListQueries.creator_id,
      groupId: newsListQueries.group_id,
      topicId: newsListQueries.topic_id,
      type: newsListQueries.type,
      pageSize: newsListQueries.page_size,
      pageNum: newsListQueries.page_num,
      timestampStart: newsListQueries.timestamp_start,
      timestampEnd: newsListQueries.timestamp_end,
      onlyHomeHot: newsListQueries.only_home_hot,
      onlyCreatorHot: newsListQueries.only_creator_hot,
      onlySectionHot: newsListQueries.only_section_hot,
    });
    return news_list;
  }
}
