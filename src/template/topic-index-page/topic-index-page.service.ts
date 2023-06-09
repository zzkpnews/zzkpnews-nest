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

    const topic_news_list_size = 10;

    const topic_news_list = await Promise.all(
      topics.map((topic) =>
        this.newsListRepository.find({
          topicId: topic.id,
          pageSize: topic_news_list_size,
        }),
      ),
    );

    const index = topics.map((topic, index) => ({
      topicId: topic.id,
      topicTitle: topic.title,
      newsList: topic_news_list[index].map((item) => ({
        newsId: item.newsId,
        newsTimestamp: item.timestamp,
        newsKeywords: item.keywords,
        newsType: item.type,
        newsTitle: item.title,
        newsLeadTitle: item.leadTitle,
        newsSubtitle: item.subtitle,
        sectionTitle: item.sectionTitle,
        newsCoverImage: item.coverImage,
        newsCitation: item.citation,
      })),
    }));

    return {
      index: index,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
