import { SectionContentPageTemplate } from '@/interface/template/SectionContentPageTemplate';
import { Controller, Get, Param } from '@nestjs/common';
import { SectionContentPageTemplateService } from './section-content-page-template.service';

@Controller('/template/section-content')
export class SectionContentPageTemplateController {
  constructor(
    private readonly pageTemplateService: SectionContentPageTemplateService,
  ) {}

  @Get(':section_id')
  async get(
    @Param('section_id') section_id: string,
  ): Promise<SectionContentPageTemplate> {
    return await this.pageTemplateService.get(section_id);
  }
}
