import { DependenceFlags } from '@/constant/dep-flags';
import { NewsListItem } from '@/interface/api/news-list';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class NewsListService {
  constructor(
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListRepository: NewsListItemRepository,
  ) {}

  async getList(
    sectionId?: string,
    creatorId?: string,
    groupId?: string,
    topicId?: string,
    type?: 'article' | 'video' | 'all',
    timestamp_offset?: number,
    count?: number,
  ): Promise<NewsListItem[]> {
    const newsbases = await this.newsListRepository.find({
      sectionId,
      creatorId,
      groupId,
      topicId,
      type,
      timestamp_offset,
      count,
    });
    return newsbases.map<NewsListItem>((item) => ({
      news_id: item.newsId,
      citation: item.citation,
      cover_image: item.coverImage,
      creator_id: item.creatorId,
      creator_title: item.creatorTitle,
      group_id: item.groupId,
      group_title: item.groupTitle,
      keywords: item.keywords,
      lead_title: item.leadTitle,
      section_id: item.sectionId,
      section_title: item.sectionTitle,
      subtitle: item.subtitle,
      timestamp: item.timestamp,
      title: item.title,
      type: item.type,
    }));
  }
}
