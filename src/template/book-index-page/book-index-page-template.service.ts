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
    const book_count_per_page = 8;
    const book_list_content = (
      await this.bookRepository.find({ count: book_count_per_page })
    ).map((book) => ({
      bookId: book.id,
      bookTitle: book.title,
      bookCoverImage: book.coverImage,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
    }));
    const book_total = await this.bookRepository.count({});
    const page_total = Math.ceil(book_total / book_count_per_page);
    return {
      booksList: { content: book_list_content, pageTotal: page_total },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
