import { DependenceFlags } from '@/constant/dep-flags';
import { NewsList, NewsListItem } from '@/interface/api/news-list';
import { NewsbaseRepository } from '@/model/entity/utils/newsbase.entity';
import { Inject, Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class NewsListService {
  constructor(
    @Inject(DependenceFlags.NewsBaseRepository)
    private readonly newsbaseRepository: Repository<NewsbaseRepository>,
  ) {}
  async getList(
    sectionId?: string,
    creatorId?: string,
    groupId?: string,
    topicId?: string,
    type?: 'article' | 'video',
    timestampOffset?: number,
  ): Promise<NewsList> {
    const newsbases = await this.newsbaseRepository.find({
      where: {
        belongingSection: { id: sectionId, belongingGroup: { id: groupId } },
        creator: { id: creatorId },
        belongingTopic: { id: topicId },
        type: type,
        timestamp: LessThan(timestampOffset),
      },
      order: {
        timestamp: 'DESC',
      },
      take: 10,
    });
    return {
      list: newsbases.map<NewsListItem>((item) => ({
        news_id: item.id,
        citation: item.citation,
        cover_image: item.coverImage,
        creator_id: item.creator.id,
        creator_title: item.creator.title,
        group_id: item.belongingSection.belongingGroup.id,
        group_title: item.belongingSection.belongingGroup.title,
        keywords: item.keywords,
        lead_title: item.leadTitle,
        section_id: item.belongingSection.id,
        section_title: item.belongingSection.title,
        subtitle: item.subtitle,
        timestamp: item.timestamp,
        title: item.title,
        type: item.type,
      })),
    };
  }
}
