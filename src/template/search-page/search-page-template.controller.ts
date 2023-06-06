import { SearchPageTemplate } from '@/interface/template/SearchPageTemplate';
import { Controller, Get } from '@nestjs/common';
import { SearchPageTemplateService } from './search-page-template.service';

@Controller('/template/search')
export class SearchPageTemplateController {
  constructor(
    private readonly pageTemplateService: SearchPageTemplateService,
  ) {}

  @Get()
  async get(): Promise<SearchPageTemplate> {
    return await this.pageTemplateService.get();
  }
}
