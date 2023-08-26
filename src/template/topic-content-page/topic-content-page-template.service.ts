import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { APIException } from '@/rc/exception/api.exception';
import { TopicContentPageTemplate } from '@/interface/template/TopicContentPageTemplate';
import { TopicRepository } from '@/model/entity/topic/topic.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
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

    if (topic == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);

    const newsListSize = 10;

    const [errNewsItems, newsItems] = await to(
      this.newsListItemRepository.find({
        topicId: topic_id,
        pageSize: newsListSize,
      }),
    );
    if (errNewsItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const newsList = newsItems.map((item) => ({
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

    const [errNewsTotal, newsTotal] = await to(
      this.newsListItemRepository.count({
        topicId: topic_id,
      }),
    );
    if (errNewsTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    return {
      topicId: topic.id,
      topicLogo: topic.logo,
      topicDescription: topic.description,
      topicTitle: topic.title,
      topicCoverImage: topic.coverImage,

      newsList: { initialList: newsList, total: newsTotal },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
