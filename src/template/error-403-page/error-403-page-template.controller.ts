import { Error403PageTemplate } from '@/interface/template/Error403PageTemplate';
import { Controller, Get } from '@nestjs/common';
import { Error403PageTemplateService } from './error-403-page-template.service';

@Controller('/template/error-403')
export class Error403PageTemplateController {
  constructor(
    private readonly pageTemplateService: Error403PageTemplateService,
  ) {}

  @Get()
  async get(): Promise<Error403PageTemplate> {
    return await this.pageTemplateService.get();
  }
}
