import { DependenceFlags } from '@/constant/dep-flags';
import { SectionIndexPageTemplate } from '@/interface/template/SectionIndexPageTemplate';
import { SectionRepository } from '@/model/entity/section/section.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';
import to from 'await-to-js';
import { API_STATUS_CODE } from '@/constant/api-status-code';
import { APIException } from '@/exception/api.exception';

@Injectable()
export class SectionIndexPageTemplateService {
  constructor(
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListRepository: NewsListItemRepository,
    @Inject(DependenceFlags.SectionRepository)
    private readonly sectionRepository: SectionRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<SectionIndexPageTemplate> {
    const sections = await this.sectionRepository.findAll();

    const recentListSize = 10;
    const hotListSize = 10;

    const [errRecentLists, recentLists] = await to(
      Promise.all(
        sections.map((section) =>
          this.newsListRepository.find({
            sectionId: section.id,
            pageSize: recentListSize,
          }),
        ),
      ),
    );
    if (errRecentLists) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const [errHotLists, hotLists] = await to(
      Promise.all(
        sections.map((section) =>
          this.newsListRepository.find({
            onlySectionHot: true,
            sectionId: section.id,
            pageSize: hotListSize,
          }),
        ),
      ),
    );
    if (errHotLists) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const index = sections.map((section, index) => ({
      sectionId: section.id,
      sectionTitle: section.title,
      recentList: recentLists[index].map((item) => ({
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
      hotList: hotLists[index].map((item) => ({
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
