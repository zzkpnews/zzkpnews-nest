import { DependenceFlags } from '@/constant/dep-flags';
import { BookReaderPageTemplate } from '@/interface/template/BookReaderPageTemplate';
import { BookRepository } from '@/model/entity/book/book.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class BookReaderPageTemplateService {
  constructor(
    @Inject(DependenceFlags.BookRepository)
    private readonly bookRepository: BookRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(book_id: string): Promise<BookReaderPageTemplate> {
    const book = await this.bookRepository.findById(book_id);
    return {
      book_title: book.title,
      book_keywords: book.keywords,
      book_cover_image: book.coverImage,
      book_citation: book.citation,
      book_timestamp: book.timestamp,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
