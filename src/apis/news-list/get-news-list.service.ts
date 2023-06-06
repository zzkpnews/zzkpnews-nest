import { DependenceFlags } from '@/constant/dep-flags';
import { NewsList, NewsListItem } from '@/interface/api/news-list';
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
    type?: 'article' | 'video',
    timestampOffset?: number,
  ): Promise<NewsList> {
    const newsbases = await this.newsListRepository.find(10);
    return {
      list: newsbases.map<NewsListItem>((item) => ({
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
      })),
    };
  }
}
