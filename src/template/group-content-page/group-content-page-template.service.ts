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
    const hot_list = (
      await this.newsListItemRepository.filterFind(
        'all',
        null,
        null,
        group_id,
        null,
        false,
        false,
        true,
        0,
        10,
      )
    ).map((item) => ({
      news_id: item.newsId,
      type: item.type,
      title: item.title,
      subtitle: item.subtitle,
      cover_image: item.coverImage,
      citation: item.citation,
    }));

    const articles_list = (
      await this.newsListItemRepository.filterFind(
        'article',
        null,
        null,
        group_id,
        null,
        false,
        false,
        false,
        0,
        10,
      )
    ).map((item) => ({
      news_id: item.newsId,
      article_title: item.title,
      article_subtitle: item.subtitle,
      article_cover_image: item.coverImage,
      article_citation: item.citation,
    }));

    const videos_list = (
      await this.newsListItemRepository.filterFind(
        'video',
        null,
        null,
        group_id,
        null,
        false,
        false,
        false,
        0,
        10,
      )
    ).map((item) => ({
      news_id: item.newsId,
      video_title: item.title,
      video_subtitle: item.subtitle,
      video_cover_image: item.coverImage,
      video_citation: item.citation,
    }));

    return {
      group_id: group.id,
      group_title: group.title,
      hot_list: hot_list,
      articles_list: articles_list,
      videos_list: videos_list,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
