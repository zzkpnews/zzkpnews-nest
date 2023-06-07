import { DependenceFlags } from '@/constant/dep-flags';
import { TopicContentPageTemplate } from '@/interface/template/TopicContentPageTemplate';
import { TopicRepository } from '@/model/entity/topic/topic.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class TopicContentPageTemplateService {
  constructor(
    @Inject(DependenceFlags.TopicRepository)
    private readonly topicRepository: TopicRepository,
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListItemRepository: NewsListItemRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(topic_id: string): Promise<TopicContentPageTemplate> {
    const topic = await this.topicRepository.findById(topic_id);
    const news_list = (
      await this.newsListItemRepository.find({
        type: 'article',
        topicId: topic_id,
        count: 10,
      })
    ).map((item) => ({
      news_id: item.newsId,
      timestamp: item.timestamp,
      type: item.type,
      title: item.title,
      lead_title: item.leadTitle,
      subtitle: item.subtitle,
      section_title: item.sectionTitle,
      cover_image: item.coverImage,
      citation: item.citation,
    }));

    return {
      topic_logo: topic.logo,
      topic_description: topic.description,
      topic_title: topic.title,
      topic_cover_image: topic.coverImage,

      news_list: news_list,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
