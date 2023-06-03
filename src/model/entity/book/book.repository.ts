import { DependenceFlags } from '@/constant/dep-flags';
import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import uuid from 'uuid';
import { Book } from './book.entity';

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
    await this.dataSource('book').insert({
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
    const result_fields = await this.dataSource.select('book').where({ id });
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

  async deleteById(id: string): Promise<void> {
    await this.dataSource('book').where({ id }).del();
  }
}
