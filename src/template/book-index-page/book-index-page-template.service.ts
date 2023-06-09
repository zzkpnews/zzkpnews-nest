import { DependenceFlags } from '@/constant/dep-flags';
import { BookIndexPageTemplate } from '@/interface/template/BookIndexPageTemplate';
import { BooksListItemRepository } from '@/model/view/books-list-item/books-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class BookIndexPageTemplateService {
  constructor(
    @Inject(DependenceFlags.BooksListItemRepository)
    private readonly booksListItemRepository: BooksListItemRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<BookIndexPageTemplate> {
    const page_size = 8;
    const book_list_content = (
      await this.booksListItemRepository.find({ count: page_size })
    ).map((book) => ({
      bookId: book.bookId,
      bookTitle: book.title,
      bookCoverImage: book.coverImage,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
    }));
    const book_total = await this.booksListItemRepository.count({});
    const page_total = Math.ceil(book_total / page_size);
    return {
      booksList: { content: book_list_content, pageTotal: page_total },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
