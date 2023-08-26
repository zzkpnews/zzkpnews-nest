import to from 'await-to-js';
import { API_STATUS_CODE } from '@/constant/api-status-code';
import { APIException } from '@/rc/exception/api.exception';
import { BookIndexPageTemplate } from '@/interface/template/BookIndexPageTemplate';
import { BookListItemRepository } from '@/model/view/book-list-item/book-list-item.repository';
import { DependenceFlags } from '@/constant/dep-flags';
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
    const [errBooks, books] = await to(this.booksListItemRepository.find({ pageSize: page_size }));
    if (errBooks) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const booksListContent = books.map((book) => ({
      bookId: book.bookId,
      bookTitle: book.title,
      bookCoverImage: book.coverImage,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
    }));
    const [errBooksTotal, bookTotal] = await to(this.booksListItemRepository.count({}));
    if (errBooksTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    return {
      bookList: { content: booksListContent, total: bookTotal },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
