import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { APIException } from '@/exception/api.exception';
import { GroupContentPageTemplate } from '@/interface/template/GroupContentPageTemplate';
import { GroupRepository } from '@/model/entity/group/group.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import { TemplateUtilsService } from '../utils/template-utils.service';

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
    const [errGroup, group] = await to(this.groupRepository.findById(group_id));
    if (errGroup) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    if (group == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);

    const hotListSize = 8;
    const articleListPageSize = 8;
    const videoListPageSize = 8;

    const [errHotItems, hotItems] = await to(
      this.newsListItemRepository.find({
        groupId: group_id,
        onlySectionHot: true,
        pageSize: hotListSize,
      }),
    );
    if (errHotItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const hotList = hotItems.map((item) => ({
      newsId: item.newsId,
      newsType: item.type,
      newsTitle: item.title,
      newsSubtitle: item.subtitle,
      newsCoverImage: item.coverImage,
      newsCitation: item.citation,
    }));

    const [errArticleItems, articleItems] = await to(
      this.newsListItemRepository.find({
        type: 'article',
        groupId: group_id,
        pageSize: articleListPageSize,
      }),
    );
    if (errArticleItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const articleListContent = articleItems.map((item) => ({
      newsId: item.newsId,
      articleTitle: item.title,
      articleSubtitle: item.subtitle,
      articleCoverImage: item.coverImage,
      articleCitation: item.citation,
    }));

    const [errArticleTotal, articleTotal] = await to(
      this.newsListItemRepository.count({
        type: 'article',
        groupId: group_id,
      }),
    );
    if (errArticleTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const [errVideoItems, videoItems] = await to(
      this.newsListItemRepository.find({
        type: 'video',
        groupId: group_id,
        pageSize: videoListPageSize,
      }),
    );
    if (errVideoItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const videoListContent = videoItems.map((item) => ({
      newsId: item.newsId,
      videoTitle: item.title,
      videoSubtitle: item.subtitle,
      videoCoverImage: item.coverImage,
      videoCitation: item.citation,
    }));

    const [errVideoTotal, videoTotal] = await to(
      this.newsListItemRepository.count({
        type: 'video',
        groupId: group_id,
      }),
    );
    if (errVideoTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    return {
      groupId: group.id,
      groupTitle: group.title,
      hotList: hotList,
      articleList: {
        content: articleListContent,
        total: articleTotal,
      },
      videoList: {
        content: videoListContent,
        total: videoTotal,
      },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
