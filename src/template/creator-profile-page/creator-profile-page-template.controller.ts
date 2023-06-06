import { CreatorProfilePageTemplate } from '@/interface/template/CreatorProfilePageTemplate';
import { Controller, Get, Param } from '@nestjs/common';
import { CreatorProfilePageTemplateService } from './creator-profile-page-template.service';

@Controller('/template/creator-profile')
export class CreatorProfilePageTemplateController {
  constructor(
    private readonly pageTemplateService: CreatorProfilePageTemplateService,
  ) {}

  @Get(':creator_id')
  async get(
    @Param('creator_id') creator_id: string,
  ): Promise<CreatorProfilePageTemplate> {
    return await this.pageTemplateService.get(creator_id);
  }
}
