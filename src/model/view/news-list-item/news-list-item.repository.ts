import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { NewsListItem } from './news-list-item.view';

@Injectable()
export class NewsListItemRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async find(count: number): Promise<NewsListItem[]> {
    const result_fields = await this.dataSource<NewsListItem>('news_list')
      .orderBy('timestamp', 'desc')
      .limit(count);
    return result_fields;
  }

  async findByCreatorId(creatorId: string, offset: number, count: number) {
    const result_fields = await this.dataSource<NewsListItem>('news_list')
      .where({ creatorId })
      .orderBy('timestamp', 'desc')
      .offset(offset)
      .limit(count);
    return result_fields;
  }

  async filterFind(
    type: 'article' | 'video' | 'all',
    creatorId: string | null,
    sectionId: string | null,
    groupId: string | null,
    topicId: string | null,
    isHomeHot: boolean | null,
    isCreatorHot: boolean | null,
    isSectionHot: boolean | null,
    offset: number,
    count: number,
  ): Promise<NewsListItem[]> {
    const query = this.dataSource<NewsListItem>('news_list');
    if (creatorId) {
      query.where({ creatorId });
    }
    if (sectionId) {
      query.where({ sectionId });
    }
    if (groupId) {
      query.where({ groupId });
    }
    if (topicId) {
      query.where({ topicId });
    }
    if (isHomeHot) {
      query.where({ homeHotMark: true });
    }
    if (isSectionHot) {
      query.where({ sectionHotMark: true });
    }
    if (isCreatorHot) {
      query.where({ creatorHotMark: true });
    }
    if (type !== 'all') {
      query.where({ type });
    }
    const result_fields = await query
      .orderBy('timestamp', 'desc')
      .offset(offset)
      .limit(count);
    return result_fields;
  }

  async findBySectionId(
    sectionId: string,
    count: number,
  ): Promise<NewsListItem[]> {
    const result_fields = await this.dataSource<NewsListItem>('news_list')
      .where({ sectionId: sectionId })
      .orderBy('timestamp', 'desc')
      .limit(count);
    return result_fields;
  }

  async findByTopicId(topicId: string, count: number): Promise<NewsListItem[]> {
    const result_fields = await this.dataSource<NewsListItem>('news_list')
      .where({ topicId: topicId })
      .orderBy('timestamp', 'desc')
      .limit(count);
    return result_fields;
  }

  async findById(newsId: string): Promise<NewsListItem | null> {
    const result_fields = await this.dataSource<NewsListItem>(
      'news_list',
    ).where({ newsId });
    return result_fields.length === 0 ? null : result_fields[0];
  }

  async findHomeHot(count: number): Promise<NewsListItem[]> {
    const result_fields = await this.dataSource<NewsListItem>('news_list')
      .where({ homeHotMark: true })
      .orderBy('timestamp', 'desc')
      .limit(count);
    return result_fields;
  }

  async findSectionHot(
    sectionId: string,
    count: number,
  ): Promise<NewsListItem[]> {
    const result_fields = await this.dataSource<NewsListItem>('news_list')
      .where({ sectionHotMark: true, sectionId: sectionId })
      .orderBy('timestamp', 'desc')
      .limit(count);
    return result_fields;
  }
}
