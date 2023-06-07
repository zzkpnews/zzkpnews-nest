import { DependenceFlags } from '@/constant/dep-flags';
import { BookReaderPageTemplate } from '@/interface/template/BookReaderPageTemplate';
import { BookRepository } from '@/model/entity/book/book.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';

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
      book_title: book.title,
      book_keywords: book.keywords,
      book_cover_image: book.coverImage,
      book_citation: book.citation,
      book_timestamp: book.timestamp,
      creator_title: creator.title,
      creator_logo: creator.logo,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
