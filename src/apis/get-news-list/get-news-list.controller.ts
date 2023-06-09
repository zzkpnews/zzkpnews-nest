import { GetNewsListQueries } from '@/apis/get-news-list/get-news-list.dto';
import { GetNewsListItem } from '@/interface/api/get-news-list';
import { Controller, Get, Header, Query } from '@nestjs/common';
import { GetNewsListService } from './get-news-list.service';

@Controller('api/get-news-list')
export class GetNewsListAPIController {
  constructor(private readonly getNewsListService: GetNewsListService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getNewsList(
    @Query() newsListQueries: GetNewsListQueries,
  ): Promise<GetNewsListItem[]> {
    const news_list = await this.getNewsListService.getList({
      sectionId: newsListQueries.section_id,
      creatorId: newsListQueries.creator_id,
      groupId: newsListQueries.group_id,
      topicId: newsListQueries.topic_id,
      type: newsListQueries.type,
      timestampOffset: newsListQueries.timestamp_offset,
      onlyHomeHot: newsListQueries.only_home_hot,
      onlyCreatorHot: newsListQueries.only_creator_hot,
      onlySectionHot: newsListQueries.only_section_hot,
      count: newsListQueries.count,
    });
    return news_list;
  }
}
