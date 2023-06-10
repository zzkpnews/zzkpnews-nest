import { DependenceFlags } from '@/constant/dep-flags';
import { SectionIndexPageTemplate } from '@/interface/template/SectionIndexPageTemplate';
import { SectionRepository } from '@/model/entity/section/section.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

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

    const recent_list_size = 10;
    const hot_list_size = 10;

    const recent_lists = await Promise.all(
      sections.map((section) =>
        this.newsListRepository.find({
          sectionId: section.id,
          pageSize: recent_list_size,
        }),
      ),
    );

    const hot_lists = await Promise.all(
      sections.map((section) =>
        this.newsListRepository.find({
          onlySectionHot: true,
          sectionId: section.id,
          pageSize: hot_list_size,
        }),
      ),
    );

    const index = sections.map((section, index) => ({
      sectionId: section.id,
      sectionTitle: section.title,
      recentList: recent_lists[index].map((item) => ({
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
      hotList: hot_lists[index].map((item) => ({
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
