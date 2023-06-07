import { DependenceFlags } from '@/constant/dep-flags';
import { BookIndexPageTemplate } from '@/interface/template/BookIndexPageTemplate';
import { BookRepository } from '@/model/entity/book/book.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class BookIndexPageTemplateService {
  constructor(
    @Inject(DependenceFlags.BookRepository)
    private readonly bookRepository: BookRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<BookIndexPageTemplate> {
    const book_list = (await this.bookRepository.find({ count: 10 })).map(
      (book) => ({
        book_id: book.id,
        book_title: book.title,
        book_cover_image: book.coverImage,
        book_citation: book.citation,
        book_timestamp: book.timestamp,
      }),
    );
    return {
      books_list: book_list,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
