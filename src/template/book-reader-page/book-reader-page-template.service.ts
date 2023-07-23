import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { APIException } from '@/exception/api.exception';
import { BookReaderPageTemplate } from '@/interface/template/BookReaderPageTemplate';
import { BookRepository } from '@/model/entity/book/book.repository';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class BookReaderPageTemplateService {
  constructor(
    @Inject(DependenceFlags.BookRepository)
    private readonly bookRepository: BookRepository,
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(book_id: string): Promise<BookReaderPageTemplate> {
    const [errBook, book] = await to(this.bookRepository.findById(book_id));
    if (book == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    if (errBook) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const [errCreator, creator] = await to(this.creatorRepository.findById(book.creatorId));
    if (creator === null || errCreator) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    return {
      bookId: book.id,
      bookTitle: book.title,
      bookKeywords: book.keywords,
      bookCoverImage: book.coverImage,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
      creatorTitle: creator.title,
      creatorLogo: creator.logo,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
