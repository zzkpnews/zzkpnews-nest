import { DependenceFlags } from '@/constant/dep-flags';
import { BooksListTable } from '@/types/tables';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BooksListItem } from './books-list-item.view';

@Injectable()
export class BooksListItemRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async find(filterOptions: {
    timestampOffset?: number;
    count?: number;
    creatorId?: string;
    closed?: boolean;
  }): Promise<BooksListItem[]> {
    const query = this.dataSource<BooksListTable>('books_list');
    const { timestampOffset, count, creatorId, closed } = filterOptions;
    if (timestampOffset) {
      query.where('timestamp', '<', timestampOffset);
    }
    if (creatorId) {
      query.where({ creatorId });
    }
    if (!closed) {
      query.where({ closed: false });
    }
    const result_fields = await query
      .orderBy('timestamp', 'desc')
      .limit(count ?? 10);
    return result_fields.map((book) => ({
      bookId: book.bookId,
      title: book.title,
      creatorId: book.creatorId,
      creatorTitle: book.title,
      citation: book.citation,
      keywords: book.keywords,
      coverImage: book.coverImage,
      timestamp: book.timestamp,
      closed: book.closed,
    }));
  }

  async count(filterOptions: {
    timestampOffset?: number;
    creatorId?: string;
    closed?: boolean;
  }): Promise<number> {
    const query = this.dataSource<BooksListTable>('books_list');
    const { timestampOffset, creatorId, closed } = filterOptions;
    if (timestampOffset) {
      query.where('timestamp', '<', timestampOffset);
    }
    if (creatorId) {
      query.where({ creatorId });
    }
    if (!closed) {
      query.where({ closed: false });
    }
    const result_fields = await query.count();
    return Number(result_fields[0]['count(*)']);
  }
}
