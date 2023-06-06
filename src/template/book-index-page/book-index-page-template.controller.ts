import { BookIndexPageTemplate } from '@/interface/template/BookIndexPageTemplate';
import { Controller, Get } from '@nestjs/common';
import { BookIndexPageTemplateService } from './book-index-page-template.service';

@Controller('/template/book-index')
export class BookIndexPageTemplateController {
  constructor(
    private readonly pageTemplateService: BookIndexPageTemplateService,
  ) {}

  @Get()
  async get(): Promise<BookIndexPageTemplate> {
    return await this.pageTemplateService.get();
  }
}
