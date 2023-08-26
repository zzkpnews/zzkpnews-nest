import { PaperPageTemplate } from '@/interface/template/PaperPageTemplate';
import { Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class PaperPageTemplateService {
  constructor(private readonly templateUtils: TemplateUtilsService) {}
  async get(paperId: string): Promise<PaperPageTemplate> {
    return {
      title: '',
      content: '',
      timestamp: Date.now(),
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
