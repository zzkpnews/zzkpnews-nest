import { DependenceFlags } from '@/constant/dep-flags';
import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import uuid from 'uuid';
import { Book } from './book.entity';
import { BookTable } from '@/types/tables';

export class BookRepository {
  constructor(
    @Inject(DependenceFlags.DataSource)
    private readonly dataSource: Knex,
  ) {}

  async create(
    creatorId: string,
    title: string,
    citation: string | null,
    keywords: string | null,
    coverImage: string | null,
  ): Promise<Book> {
    const id = uuid.v4();
    const timestamp = Date.now();
    return new Book(
      id,
      creatorId,
      title,
      citation,
      keywords,
      coverImage,
      timestamp,
      false,
    );
  }

  async save(book: Book) {
    await this.dataSource<BookTable>('book').insert({
      id: book.id,
      title: book.title,
      creatorId: book.creatorId,
      citation: book.citation,
      keywords: book.keywords,
      coverImage: book.coverImage,
      closed: book.closed,
    });
  }

  async findById(id: string): Promise<Book | null> {
    const result_fields = await this.dataSource<BookTable>('book').where({
      id,
    });
    if (result_fields.length === 0) return null;
    return new Book(
      result_fields[0].id,
      result_fields[0].creatorId,
      result_fields[0].title,
      result_fields[0].citation,
      result_fields[0].keywords,
      result_fields[0].coverImage,
      result_fields[0].timestamp,
      result_fields[0].closed,
    );
  }

  async findNext(
    id: string | null,
    offset: number,
    count: number,
  ): Promise<Book[]> {
    const result_fields = await this.dataSource<BookTable>('book')
      .where({ id })
      .offset(offset)
      .limit(count)
      .orderBy('timestamp', 'desc');
    return result_fields.map(
      (book) =>
        new Book(
          book.id,
          book.creatorId,
          book.title,
          book.citation,
          book.keywords,
          book.coverImage,
          book.timestamp,
          book.closed,
        ),
    );
  }

  async findRecent(offset: number, count: number): Promise<Book[]> {
    const result_fields = await this.dataSource<BookTable>('book')
      .offset(offset)
      .limit(count)
      .orderBy('timestamp', 'desc');
    return result_fields.map(
      (book) =>
        new Book(
          book.id,
          book.creatorId,
          book.title,
          book.citation,
          book.keywords,
          book.coverImage,
          book.timestamp,
          book.closed,
        ),
    );
  }

  async findByCreatorId(
    creatorId: string,
    offset: number,
    count: number,
  ): Promise<Book[]> {
    const result_fields = await this.dataSource<BookTable>('book')
      .where({
        creatorId,
      })
      .offset(offset)
      .limit(count);
    return result_fields.map(
      (item) =>
        new Book(
          item.id,
          item.creatorId,
          item.title,
          item.citation,
          item.keywords,
          item.coverImage,
          item.timestamp,
          item.closed,
        ),
    );
  }

  async deleteByCreatorId(creatorId: string) {
    await this.dataSource<BookTable>('book').where({ creatorId }).del();
  }

  async deleteById(id: string): Promise<void> {
    await this.dataSource<BookTable>('book').where({ id }).del();
  }
}
