import { Controller } from '@nestjs/common';
import { SectionIndexPageTemplateService } from './section-index-page.service';
import { SectionIndexPageTemplate } from '@/interface/template/SectionIndexPageTemplate';

@Controller('/template/home')
export class SectionIndexPageTemplateController {
  constructor(
    private readonly sectionIndexPageTemplateService: SectionIndexPageTemplateService,
  ) {}

  async get(): Promise<SectionIndexPageTemplate> {
    return await this.sectionIndexPageTemplateService.get();
  }
}
