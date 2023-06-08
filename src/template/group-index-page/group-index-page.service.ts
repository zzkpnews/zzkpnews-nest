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
          await this.newsListRepository.find({
            type: 'article',
            groupId: group.id,
            count: 10,
          })
        ).map((item) => ({
          newsId: item.newsId,
          articleTitle: item.title,
          articleSubtitle: item.subtitle,
          articleCoverImage: item.coverImage,
        })),
      ),
    );

    const videos_lists = await Promise.all(
      groups.map(async (group) =>
        (
          await this.newsListRepository.find({
            type: 'video',
            groupId: group.id,
            count: 9,
          })
        ).map((item) => ({
          newsId: item.newsId,
          videoTitle: item.title,
          videoSubtitle: item.subtitle,
          videoCoverImage: item.coverImage,
        })),
      ),
    );

    const index = groups.map((group, index) => ({
      groupId: group.id,
      groupTitle: group.title,
      articlesList: articles_lists[index],
      videosList: videos_lists[index],
    }));

    return {
      index: index,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
