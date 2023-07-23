import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { APIException } from '@/exception/api.exception';
import { SectionContentPageTemplate } from '@/interface/template/SectionContentPageTemplate';
import { SectionRepository } from '@/model/entity/section/section.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class SectionContentPageTemplateService {
  constructor(
    @Inject(DependenceFlags.SectionRepository)
    private readonly sectionRepository: SectionRepository,
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListItemRepository: NewsListItemRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(section_id: string): Promise<SectionContentPageTemplate> {
    const section = await this.sectionRepository.findById(section_id);

    if (section == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);

    const hotListPageSize = 8;
    const articleListPageSize = 8;
    const videoListPageSize = 8;

    const [errHotItems, hotItems] = await to(
      this.newsListItemRepository.find({
        onlySectionHot: true,
        sectionId: section_id,
        pageSize: hotListPageSize,
      }),
    );
    if (errHotItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const hotList = hotItems.map((item) => ({
      newsId: item.newsId,
      newsType: item.type,
      newsTitle: item.title,
      newsLeadTitle: item.leadTitle,
      newsSubtitle: item.subtitle,
      newsCitation: item.citation,
      newsCoverImage: item.coverImage,
    }));

    const [errArticleTotal, articlesTotal] = await to(
      this.newsListItemRepository.count({
        type: 'article',
        sectionId: section_id,
      }),
    );
    if (errArticleTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const [errArticleItems, articlesItems] = await to(
      this.newsListItemRepository.find({
        type: 'article',
        sectionId: section_id,
        pageSize: articleListPageSize,
      }),
    );
    if (errArticleItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const articleListContent = articlesItems.map((item) => ({
      newsId: item.newsId,
      articleTitle: item.title,
      articleLeadTitle: item.leadTitle,
      articleSubtitle: item.subtitle,
      articleCitation: item.citation,
      articleCoverImage: item.coverImage,
    }));

    const [errVideoTotal, videosTotal] = await to(
      this.newsListItemRepository.count({
        type: 'video',
        sectionId: section_id,
      }),
    );
    if (errVideoTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const [errVideoItems, videoItems] = await to(
      this.newsListItemRepository.find({
        type: 'video',
        sectionId: section_id,
        pageSize: videoListPageSize,
      }),
    );
    if (errVideoItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const videoListContent = videoItems.map((item) => ({
      newsId: item.newsId,
      videoTitle: item.title,
      videoCitation: item.citation,
      videoCoverImage: item.coverImage,
    }));

    return {
      sectionId: section.id,
      sectionTitle: section.title,
      hotList: hotList,
      articleList: {
        content: articleListContent,
        total: articlesTotal,
      },
      videoList: {
        content: videoListContent,
        total: videosTotal,
      },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
