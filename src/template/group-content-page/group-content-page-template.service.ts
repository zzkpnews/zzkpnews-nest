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
    const articles_list_page_size = 8;
    const videos_list_page_size = 8;

    const hot_list = (
      await this.newsListItemRepository.find({
        groupId: group_id,
        pageSize: hot_list_news_count,
      })
    ).map((item) => ({
      newsId: item.newsId,
      newsType: item.type,
      newsTitle: item.title,
      newsSubtitle: item.subtitle,
      newsCoverImage: item.coverImage,
      newsCitation: item.citation,
    }));

    const article_list_content = (
      await this.newsListItemRepository.find({
        type: 'article',
        groupId: group_id,
        pageSize: articles_list_page_size,
      })
    ).map((item) => ({
      newsId: item.newsId,
      articleTitle: item.title,
      articleSubtitle: item.subtitle,
      articleCoverImage: item.coverImage,
      articleCitation: item.citation,
    }));
    const article_total_by_group = await this.newsListItemRepository.count({
      type: 'article',
      groupId: group_id,
    });

    const video_list_content = (
      await this.newsListItemRepository.find({
        type: 'video',
        groupId: group_id,
        pageSize: videos_list_page_size,
      })
    ).map((item) => ({
      newsId: item.newsId,
      videoTitle: item.title,
      videoSubtitle: item.subtitle,
      videoCoverImage: item.coverImage,
      videoCitation: item.citation,
    }));
    const video_total_by_group = await this.newsListItemRepository.count({
      type: 'video',
      groupId: group_id,
    });

    return {
      groupId: group.id,
      groupTitle: group.title,
      hotList: hot_list,
      articleList: {
        content: article_list_content,
        total: article_total_by_group,
      },
      videoList: {
        content: video_list_content,
        total: video_total_by_group,
      },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
