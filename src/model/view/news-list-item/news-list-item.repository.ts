import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { NewsListItem } from './news-list-item.view';

@Injectable()
export class NewsListItemRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async find(filterOptions: {
    type?: 'article' | 'video' | 'all';
    count?: number | null;
    timestamp_offset?: number | null;
    creatorId?: string | null;
    sectionId?: string | null;
    groupId?: string | null;
    topicId?: string | null;
    onlyHomeHot?: boolean;
    onlyCreatorHot?: boolean;
    onlySectionHot?: boolean;
    closed?: boolean;
  }): Promise<NewsListItem[]> {
    const query = this.dataSource<NewsListItem>('news_list');

    const {
      type,
      count,
      timestamp_offset,
      creatorId,
      sectionId,
      groupId,
      topicId,
      onlyHomeHot,
      onlyCreatorHot,
      onlySectionHot,
      closed,
    } = filterOptions;

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
    if (onlyHomeHot) {
      query.where({ homeHotMark: true });
    }
    if (onlySectionHot) {
      query.where({ sectionHotMark: true });
    }
    if (onlyCreatorHot) {
      query.where({ creatorHotMark: true });
    }
    if (type === 'article' || type === 'video') {
      query.where({ type });
    }
    if (timestamp_offset) {
      query.where('timestamp', '<', timestamp_offset);
    }
    if (!closed) {
      query.where({ closed: false });
    }

    const result_fields = await query
      .orderBy('timestamp', 'desc')
      .limit(count ?? 10);
    return result_fields;
  }

  async count(filterOptions: {
    type?: 'article' | 'video' | 'all';
    count?: number | null;
    timestamp_offset?: number | null;
    creatorId?: string | null;
    sectionId?: string | null;
    groupId?: string | null;
    topicId?: string | null;
    onlyHomeHot?: boolean;
    onlyCreatorHot?: boolean;
    onlySectionHot?: boolean;
    closed?: boolean;
  }): Promise<number> {
    const query = this.dataSource<NewsListItem>('news_list');

    const {
      type,
      timestamp_offset,
      creatorId,
      sectionId,
      groupId,
      topicId,
      onlyHomeHot,
      onlyCreatorHot,
      onlySectionHot,
      closed,
    } = filterOptions;

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
    if (onlyHomeHot) {
      query.where({ homeHotMark: true });
    }
    if (onlySectionHot) {
      query.where({ sectionHotMark: true });
    }
    if (onlyCreatorHot) {
      query.where({ creatorHotMark: true });
    }
    if (type === 'article' || type === 'video') {
      query.where({ type });
    }
    if (timestamp_offset) {
      query.where('timestamp', '<', timestamp_offset);
    }
    if (!closed) {
      query.where({ closed: false });
    }

    const result_fields = await query.count();
    return Number(result_fields[0]['count(*)']);
  }

  async findById(newsId: string): Promise<NewsListItem | null> {
    const result_fields = await this.dataSource<NewsListItem>(
      'news_list',
    ).where({ newsId });
    return result_fields.length === 0 ? null : result_fields[0];
  }
}
