import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { NewsListItem } from './news-list-item.view';

@Injectable()
export class NewsListRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async find(count: number): Promise<NewsListItem[]> {
    const result_fields = await this.dataSource<NewsListItem>('news_list')
      .orderBy('timestamp', 'desc')
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
