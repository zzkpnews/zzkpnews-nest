import { TopicContentPageTemplate } from '@/interface/template/TopicContentPageTemplate';
import { Controller, Get, Param } from '@nestjs/common';
import { TopicContentPageTemplateService } from './topic-content-page-template.service';

@Controller('/template/topic-content')
export class TopicContentPageTemplateController {
  constructor(
    private readonly pageTemplateService: TopicContentPageTemplateService,
  ) {}

  @Get(':topic_id')
  async get(
    @Param('topic_id') topic_id: string,
  ): Promise<TopicContentPageTemplate> {
    return await this.pageTemplateService.get(topic_id);
  }
}
