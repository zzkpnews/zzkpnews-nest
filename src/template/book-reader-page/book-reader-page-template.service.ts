import { DependenceFlags } from '@/constant/dep-flags';
import { BookReaderPageTemplate } from '@/interface/template/BookReaderPageTemplate';
import { BookRepository } from '@/model/entity/book/book.repository';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { Inject, Injectable } from '@nestjs/common';
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
    const book = await this.bookRepository.findById(book_id);
    const creator = await this.creatorRepository.findById(book.creatorId);
    return {
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
