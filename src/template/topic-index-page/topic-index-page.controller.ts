import { TopicIndexPageTemplate } from '@/interface/template/TopicIndexPageTemplate';
import { Controller, Get } from '@nestjs/common';
import { TopicIndexPageTemplateService } from './topic-index-page.service';

@Controller('/template/topic-index')
export class TopicIndexPageTemplateController {
  constructor(
    private readonly topicIndexPageTemplateService: TopicIndexPageTemplateService,
  ) {}

  @Get()
  async get(): Promise<TopicIndexPageTemplate> {
    return await this.topicIndexPageTemplateService.get();
  }
}
