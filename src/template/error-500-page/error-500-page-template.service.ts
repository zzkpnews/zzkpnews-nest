import { Error500PageTemplate } from '@/interface/template/Error500PageTemplate';
import { Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class Error500PageTemplateService {
  constructor(private readonly templateUtils: TemplateUtilsService) {}
  async get(): Promise<Error500PageTemplate> {
    return {
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
