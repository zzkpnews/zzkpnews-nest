import { BookReaderPageTemplate } from '@/interface/template/BookReaderPageTemplate';
import { Controller, Get, Param } from '@nestjs/common';
import { BookReaderPageTemplateService } from './book-reader-page-template.service';

@Controller('/template/book-reader')
export class BookReaderPageTemplateController {
  constructor(
    private readonly pageTemplateService: BookReaderPageTemplateService,
  ) {}

  @Get(':book_id')
  async get(
    @Param('book_id') book_id: string,
  ): Promise<BookReaderPageTemplate> {
    return await this.pageTemplateService.get(book_id);
  }
}
