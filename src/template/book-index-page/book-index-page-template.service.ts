import { DependenceFlags } from '@/constant/dep-flags';
import { BookIndexPageTemplate } from '@/interface/template/BookIndexPageTemplate';
import { BookListItemRepository } from '@/model/view/book-list-item/book-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class BookIndexPageTemplateService {
  constructor(
    @Inject(DependenceFlags.BooksListItemRepository)
    private readonly booksListItemRepository: BookListItemRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<BookIndexPageTemplate> {
    const page_size = 8;
    const book_list_content = (
      await this.booksListItemRepository.find({ pageSize: page_size })
    ).map((book) => ({
      bookId: book.bookId,
      bookTitle: book.title,
      bookCoverImage: book.coverImage,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
    }));
    const book_total = await this.booksListItemRepository.count({});

    return {
      bookList: { content: book_list_content, total: book_total },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
