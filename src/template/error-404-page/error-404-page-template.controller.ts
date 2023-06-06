import { Error404PageTemplate } from '@/interface/template/Error404PageTemplate';
import { Controller, Get } from '@nestjs/common';
import { Error404PageTemplateService } from './error-404-page-template.service';

@Controller('/template/error-404')
export class Error404PageTemplateController {
  constructor(
    private readonly pageTemplateService: Error404PageTemplateService,
  ) {}

  @Get()
  async get(): Promise<Error404PageTemplate> {
    return await this.pageTemplateService.get();
  }
}
