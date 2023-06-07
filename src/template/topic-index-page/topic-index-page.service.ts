import { DependenceFlags } from '@/constant/dep-flags';
import { TopicIndexPageTemplate } from '@/interface/template/TopicIndexPageTemplate';
import { TopicRepository } from '@/model/entity/topic/topic.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class TopicIndexPageTemplateService {
  constructor(
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListRepository: NewsListItemRepository,
    @Inject(DependenceFlags.TopicRepository)
    private readonly topicRepository: TopicRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<TopicIndexPageTemplate> {
    const topics = await this.topicRepository.findAll();

    const topic_news_list = await Promise.all(
      topics.map((topic) =>
        this.newsListRepository.find({ topicId: topic.id, count: 10 }),
      ),
    );

    const index = topics.map((topic, index) => ({
      topic_id: topic.id,
      topic_title: topic.title,
      news_list: topic_news_list[index].map((item) => ({
        news_id: item.newsId,
        timestamp: item.timestamp,
        keywords: item.keywords,
        type: item.type,
        title: item.title,
        lead_title: item.leadTitle,
        subtitle: item.subtitle,
        section_title: item.sectionTitle,
        cover_image: item.coverImage,
        citation: item.citation,
      })),
    }));

    return {
      index: index,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
