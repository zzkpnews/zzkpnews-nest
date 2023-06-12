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

    const news_list_size = 10;

    const news_list = (
      await this.newsListItemRepository.find({
        topicId: topic_id,
        pageSize: news_list_size,
      })
    ).map((item) => ({
      newsId: item.newsId,
      newsTimestamp: item.timestamp,
      newsType: item.type,
      newsTitle: item.title,
      newsLeadTitle: item.leadTitle,
      newsSubtitle: item.subtitle,
      sectionTitle: item.sectionTitle,
      newsCoverImage: item.coverImage,
      newsCitation: item.citation,
    }));

    const total = await this.newsListItemRepository.count({
      topicId: topic_id,
    });

    return {
      topicId: topic.id,
      topicLogo: topic.logo,
      topicDescription: topic.description,
      topicTitle: topic.title,
      topicCoverImage: topic.coverImage,

      newsList: { initialList: news_list, total: total },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
