import { DependenceFlags } from '@/constant/dep-flags';
import { GroupIndexPageTemplate } from '@/interface/template/GroupIndexPageTemplate';
import { GroupRepository } from '@/model/entity/group/group.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class GroupIndexPageTemplateService {
  constructor(
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListRepository: NewsListItemRepository,
    @Inject(DependenceFlags.GroupRepository)
    private readonly groupRepository: GroupRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<GroupIndexPageTemplate> {
    const groups = await this.groupRepository.findAll();

    const articles_lists = await Promise.all(
      groups.map(async (group) =>
        (
          await this.newsListRepository.filterFind(
            'article',
            null,
            null,
            group.id,
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
        })),
      ),
    );

    const videos_lists = await Promise.all(
      groups.map(async (group) =>
        (
          await this.newsListRepository.filterFind(
            'video',
            null,
            null,
            group.id,
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
        })),
      ),
    );

    const index = groups.map((group, index) => ({
      group_id: group.id,
      group_title: group.title,
      articles_list: articles_lists[index],
      videos_list: videos_lists[index],
    }));

    return {
      index: index,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
