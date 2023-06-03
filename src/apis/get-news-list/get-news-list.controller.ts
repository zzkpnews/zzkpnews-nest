import { GetNewsListQueryDTO } from '@/apis/get-news-list/get-news-list.dto';
import { NewsList } from '@/interface/api/news-list';
import { Controller, Get, Query } from '@nestjs/common';
import { NewsListService } from './get-news-list.service';

@Controller('api/news-list')
export class NewsListController {
  constructor(private readonly newsListService: NewsListService) {}

  @Get()
  async getNewsList(
    @Query() newsListQueryDTO: GetNewsListQueryDTO,
  ): Promise<NewsList> {
    const {
      section_id,
      creator_id,
      group_id,
      topic_id,
      type,
      timestamp_offset,
    } = newsListQueryDTO;

    const news_list = await this.newsListService.getList(
      section_id,
      creator_id,
      group_id,
      topic_id,
      type,
      timestamp_offset,
    );
    return news_list;
  }
}
