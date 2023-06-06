import { Error404PageTemplate } from '@/interface/template/Error404PageTemplate';
import { Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class Error404PageTemplateService {
  constructor(private readonly templateUtils: TemplateUtilsService) {}
  async get(): Promise<Error404PageTemplate> {
    return {
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
