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

    const recent_lists = await Promise.all(
      sections.map((section) =>
        this.newsListRepository.find({ sectionId: section.id, count: 10 }),
      ),
    );

    const hot_lists = await Promise.all(
      sections.map((section) =>
        this.newsListRepository.find({
          onlySectionHot: true,
          sectionId: section.id,
          count: 10,
        }),
      ),
    );

    const index = sections.map((section, index) => ({
      section_id: section.id,
      section_title: section.title,
      recent_list: recent_lists[index].map((item) => ({
        news_id: item.newsId,
        timestamp: item.timestamp,
        keywords: item.keywords,
        type: item.type,
        title: item.title,
        lead_title: item.leadTitle,
        subtitle: item.subtitle,
        section_title: item.sectionTitle,
        cover_image: item.coverImage,
        citation: item.citation,
      })),
      hot_list: hot_lists[index].map((item) => ({
        news_id: item.newsId,
        timestamp: item.timestamp,
        keywords: item.keywords,
        type: item.type,
        title: item.title,
        lead_title: item.leadTitle,
        subtitle: item.subtitle,
        section_title: item.sectionTitle,
        cover_image: item.coverImage,
        citation: item.citation,
      })),
    }));

    return {
      index: index,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
