import { Controller } from '@nestjs/common';
import { SectionIndexPageTemplateService } from './section-index-page.service';

@Controller('/template/home')
export class SectionIndexPageTemplateController {
  constructor(
    private readonly sectionIndexPageTemplateService: SectionIndexPageTemplateService,
  ) {}
}
