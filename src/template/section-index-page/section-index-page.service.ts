import { DependenceFlags } from '@/constant/dep-flags';
import { SectionIndexPageTemplate } from '@/interface/template/SectionIndexPageTemplate';
import { CarouselRepository } from '@/model/entity/carousel/carousel.repository';
import { SectionRepository } from '@/model/entity/section/section.repository';
import { TopicRepository } from '@/model/entity/topic/topic.repository';
import { NewsListRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class SectionIndexPageTemplateService {
  constructor(
    @Inject(DependenceFlags.ObjectStorage)
    private readonly objectStorage: ObjectStorage,
    @Inject(DependenceFlags.NewsListRepository)
    private readonly newsListRepository: NewsListRepository,
    @Inject(DependenceFlags.TopicRepository)
    private readonly topicRepository: TopicRepository,
    @Inject(DependenceFlags.CarouselRepository)
    private readonly carouselRepository: CarouselRepository,
    @Inject(DependenceFlags.SectionRepository)
    private readonly sectionRepository: SectionRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<SectionIndexPageTemplate> {
    const sections = await this.sectionRepository.findAll();

    const recent_lists = await Promise.all(
      sections.map((section) =>
        this.newsListRepository.findBySectionId(section.id, 10),
      ),
    );

    const hot_lists = await Promise.all(
      sections.map((section) =>
        this.newsListRepository.findSectionHot(section.id, 10),
      ),
    );

    const index = sections.map((section, index) => ({
      section: { id: section.id, title: section.title },
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
