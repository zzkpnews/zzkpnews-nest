import { Error500PageTemplate } from '@/interface/template/Error500PageTemplate';
import { Controller } from '@nestjs/common';
import { Error500PageTemplateService } from './error-500-page-template.service';

@Controller('/template/error-500')
export class Error500PageTemplateController {
  constructor(
    private readonly pageTemplateService: Error500PageTemplateService,
  ) {}

  async get(): Promise<Error500PageTemplate> {
    return await this.pageTemplateService.get();
  }
}
