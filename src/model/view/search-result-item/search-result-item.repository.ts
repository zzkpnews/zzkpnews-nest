import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import * as mysql from 'mysql2';
import { SearchResultItem } from './search-result-item.view';

@Injectable()
export class SearchResultItemRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async find(
    searchWord: string,
    timestamp_offset: number,
    count: number,
  ): Promise<SearchResultItem[]> {
    const search_words = `%${mysql
      .escape(searchWord)
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
      .as('result')
      .where('timestamp', '<', timestamp_offset)
      .orderBy('timestamp', 'desc')
      .limit(count);
    console.log(query.toSQL());
    const result_fields = await query;
    return result_fields.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      cover_image: item.coverImage,
      description: item.description,
      timestamp: item.timestamp,
    }));
  }
}
