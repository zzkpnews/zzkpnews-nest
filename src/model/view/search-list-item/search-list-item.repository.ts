import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import * as mysql from 'mysql2';
import { SearchListItem } from './search-list-item.view';

@Injectable()
export class SearchListItemRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async find(options: {
    searchWord: string;
    pageSize?: number;
    pageNum?: number;
    timestampStart?: number;
    timestampEnd?: number;
  }): Promise<SearchListItem[]> {
    const search_words = `%${mysql
      .escape(options.searchWord)
      .replace(/'/g, '')
      .replace(/ /g, '%')}%`;
    const query = this.dataSource
      .select('*')
      .from((unx) =>
        unx
          .select(
            'newsbase.id',
            'title',
            'newsbase.citation as description',
            'newsbase.type',
            'newsbase.coverImage',
            'timestamp',
          )
          .from('newsbase')
          .whereRaw(
            "CONCAT_WS('', newsbase.title, newsbase.subtitle, newsbase.leadTitle, newsbase.citation) LIKE ?",
            [search_words],
          )
          .union((trx) => {
            trx
              .select(
                'id',
                'title',
                'book.citation as description',
                this.dataSource.raw("'book' as type"),
                'book.coverImage',
                'timestamp',
              )
              .from('book')
              .whereRaw("CONCAT_WS('', book.title, book.citation) LIKE ?", [
                search_words,
              ]);
          })
          .as('books'),
      )
      .as('result');

    if (options.timestampEnd) {
      query.where('timestamp', '<', options.timestampEnd);
    }

    if (options.timestampStart) {
      query.where('timestamp', '>', options.timestampStart);
    }

    query
      .orderBy('timestamp', 'desc')
      .orderBy('timestamp', 'desc')
      .limit(options.pageSize)
      .offset(((options.pageNum ?? 1) - 1) * (options.pageSize ?? 10));

    console.log(query.toSQL());
    const result_fields = await query;
    return result_fields.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      coverImage: item.coverImage,
      description: item.description,
      timestamp: item.timestamp,
    }));
  }
}
