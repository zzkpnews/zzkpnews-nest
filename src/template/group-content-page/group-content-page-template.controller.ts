import { GroupContentPageTemplate } from '@/interface/template/GroupContentPageTemplate';
import { Controller, Get, Param } from '@nestjs/common';
import { GroupContentPageTemplateService } from './group-content-page-template.service';

@Controller('/template/group-content')
export class GroupContentPageTemplateController {
  constructor(
    private readonly pageTemplateService: GroupContentPageTemplateService,
  ) {}

  @Get(':group_id')
  async get(
    @Param('group_id') group_id: string,
  ): Promise<GroupContentPageTemplate> {
    return await this.pageTemplateService.get(group_id);
  }
}
