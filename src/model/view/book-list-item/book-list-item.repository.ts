import { DependenceFlags } from '@/constant/dep-flags';
import { BooksListTable } from '@/types/tables';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BookListItem } from './book-list-item.view';

@Injectable()
export class BookListItemRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async find(filterOptions: {
    pageSize?: number;
    pageNum?: number;
    timestampStart?: number;
    timestampEnd?: number;
    creatorId?: string;
    closed?: boolean;
  }): Promise<BookListItem[]> {
    const query = this.dataSource<BooksListTable>('books_list');
    const {
      timestampEnd,
      timestampStart,
      creatorId,
      closed,
      pageNum,
      pageSize,
    } = filterOptions;
    if (timestampEnd) query.where('timestamp', '<', timestampEnd);
    if (timestampStart) query.where('timestamp', '>', timestampStart);
    if (creatorId) query.where({ creatorId });
    if (!closed) query.where({ closed: false });

    query
      .orderBy('timestamp', 'desc')
      .limit(pageSize)
      .offset(((pageNum ?? 1) - 1) * (pageSize ?? 10));

    const result_fields = await query;

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
    timestampStart?: number;
    timestampEnd?: number;
    creatorId?: string;
    closed?: boolean;
  }): Promise<number> {
    const query = this.dataSource<BooksListTable>('books_list');
    const { timestampEnd, timestampStart, creatorId, closed } = filterOptions;
    if (timestampEnd) query.where('timestamp', '<', timestampEnd);
    if (timestampStart) query.where('timestamp', '>', timestampStart);
    if (creatorId) query.where({ creatorId });
    if (!closed) query.where({ closed: false });
    const result_fields = await query.count();
    return Number(result_fields[0]['count(*)']);
  }
}
