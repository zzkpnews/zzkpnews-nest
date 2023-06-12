import { DependenceFlags } from '@/constant/dep-flags';
import { GetNewsListAPIContent } from '@/interface/api/get-news-list';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetNewsListService {
  constructor(
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListRepository: NewsListItemRepository,
  ) {}

  async getList(options: {
    sectionId?: string;
    creatorId?: string;
    groupId?: string;
    topicId?: string;
    onlyHomeHot?: boolean;
    onlySectionHot?: boolean;
    onlyCreatorHot?: boolean;
    type?: 'article' | 'video' | 'all';
    timestampStart?: number;
    timestampEnd?: number;
    pageSize?: number;
    pageNum?: number;
  }): Promise<GetNewsListAPIContent> {
    const news_items = await this.newsListRepository.find({
      sectionId: options.sectionId,
      creatorId: options.creatorId,
      groupId: options.groupId,
      topicId: options.topicId,
      type: options.type,
      timestampStart: options.timestampStart,
      timestampEnd: options.timestampEnd,
      pageSize:
        options.pageSize && options.pageSize < 11 ? options.pageSize : 10,
      pageNum: options.pageNum,
      onlyHomeHot: options.onlyHomeHot,
      onlySectionHot: options.onlySectionHot,
      onlyCreatorHot: options.onlyCreatorHot,
    });
    return news_items.map<ArrayElement<GetNewsListAPIContent>>((item) => ({
      newsId: item.newsId,
      newsCitation: item.citation,
      newsCoverImage: item.coverImage,
      creatorId: item.creatorId,
      creatorTitle: item.creatorTitle,
      groupId: item.groupId,
      groupTitle: item.groupTitle,
      newsKeywords: item.keywords,
      newsLeadTitle: item.leadTitle,
      sectionId: item.sectionId,
      sectionTitle: item.sectionTitle,
      topicId: item.topicId,
      topicTitle: item.topicTitle,
      newsSubtitle: item.subtitle,
      newsTimestamp: item.timestamp,
      newsTitle: item.title,
      newsType: item.type,
    }));
  }
}
