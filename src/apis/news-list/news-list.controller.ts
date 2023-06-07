import { GetNewsListQueries } from '@/apis/news-list/news-list.dto';
import { NewsListItem } from '@/interface/api/news-list';
import { Controller, Get, Query } from '@nestjs/common';
import { NewsListService } from './news-list.service';

@Controller('api/news-list')
export class NewsListController {
  constructor(private readonly newsListService: NewsListService) {}

  @Get()
  async getNewsList(
    @Query() newsListQueries: GetNewsListQueries,
  ): Promise<NewsListItem[]> {
    const news_list = await this.newsListService.getList(
      newsListQueries.section_id,
      newsListQueries.creator_id,
      newsListQueries.group_id,
      newsListQueries.topic_id,
      newsListQueries.type,
      newsListQueries.timestamp_offset,
    );
    return news_list;
  }
}
