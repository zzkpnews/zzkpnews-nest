import { GroupContentPageTemplate } from '@/interface/template/GroupContentPageTemplate';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';
import { DependenceFlags } from '@/constant/dep-flags';
import { GroupRepository } from '@/model/entity/group/group.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';

@Injectable()
export class GroupContentPageTemplateService {
  constructor(
    @Inject(DependenceFlags.GroupRepository)
    private readonly groupRepository: GroupRepository,
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListItemRepository: NewsListItemRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(group_id: string): Promise<GroupContentPageTemplate> {
    const group = await this.groupRepository.findById(group_id);
    const hot_list_news_count = 8;
    const articles_list_news_count_per_page = 8;
    const videos_list_news_count_per_page = 8;

    const hot_list = (
      await this.newsListItemRepository.find({
        groupId: group_id,
        count: hot_list_news_count,
      })
    ).map((item) => ({
      newsId: item.newsId,
      newsType: item.type,
      newsTitle: item.title,
      newsSubtitle: item.subtitle,
      newsCoverImage: item.coverImage,
      newsCitation: item.citation,
    }));

    const articles_list_content = (
      await this.newsListItemRepository.find({
        type: 'article',
        groupId: group_id,
        count: articles_list_news_count_per_page,
      })
    ).map((item) => ({
      newsId: item.newsId,
      articleTitle: item.title,
      articleSubtitle: item.subtitle,
      articleCoverImage: item.coverImage,
      articleCitation: item.citation,
    }));
    const articles_total_by_group = await this.newsListItemRepository.count({
      type: 'article',
      groupId: group_id,
    });

    const videos_list_content = (
      await this.newsListItemRepository.find({
        type: 'video',
        groupId: group_id,
        count: videos_list_news_count_per_page,
      })
    ).map((item) => ({
      newsId: item.newsId,
      videoTitle: item.title,
      videoSubtitle: item.subtitle,
      videoCoverImage: item.coverImage,
      videoCitation: item.citation,
    }));
    const videos_total_by_group = await this.newsListItemRepository.count({
      type: 'video',
      groupId: group_id,
    });

    const articles_list_page_total = Math.ceil(
      articles_total_by_group / articles_list_news_count_per_page,
    );

    const videos_list_page_total = Math.ceil(
      videos_total_by_group / videos_list_news_count_per_page,
    );

    return {
      group_id: group.id,
      group_title: group.title,
      hotList: hot_list,
      articlesList: {
        content: articles_list_content,
        pageTotal: articles_list_page_total,
      },
      videosList: {
        content: videos_list_content,
        pageTotal: videos_list_page_total,
      },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
