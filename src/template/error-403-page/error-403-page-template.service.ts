import { Error403PageTemplate } from '@/interface/template/Error403PageTemplate';
import { Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class Error403PageTemplateService {
  constructor(private readonly templateUtils: TemplateUtilsService) {}
  async get(): Promise<Error403PageTemplate> {
    return {
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
