import { Controller, Get } from '@nestjs/common';
import { SectionIndexPageTemplateService } from './section-index-page.service';
import { SectionIndexPageTemplate } from '@/interface/template/SectionIndexPageTemplate';

@Controller('/template/section-index')
export class SectionIndexPageTemplateController {
  constructor(
    private readonly sectionIndexPageTemplateService: SectionIndexPageTemplateService,
  ) {}

  @Get()
  async get(): Promise<SectionIndexPageTemplate> {
    return await this.sectionIndexPageTemplateService.get();
  }
}
