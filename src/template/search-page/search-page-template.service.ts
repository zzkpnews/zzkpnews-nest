import { SearchPageTemplate } from '@/interface/template/SearchPageTemplate';
import { Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class SearchPageTemplateService {
  constructor(private readonly templateUtils: TemplateUtilsService) {}
  async get(): Promise<SearchPageTemplate> {
    return {
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
