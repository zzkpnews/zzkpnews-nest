import { DependenceFlags } from '@/constant/dep-flags';
import { SectionContentPageTemplate } from '@/interface/template/SectionContentPageTemplate';
import { SectionRepository } from '@/model/entity/section/section.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
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

    const hot_list = (
      await this.newsListItemRepository.filterFind(
        'all',
        null,
        section_id,
        null,
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
      lead_title: item.leadTitle,
      subtitle: item.subtitle,
      citation: item.citation,
      cover_image: item.coverImage,
    }));

    const articles_list = (
      await this.newsListItemRepository.filterFind(
        'article',
        null,
        section_id,
        null,
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
      article_lead_title: item.leadTitle,
      article_subtitle: item.subtitle,
      article_citation: item.citation,
      article_cover_image: item.coverImage,
    }));

    const videos_list = (
      await this.newsListItemRepository.filterFind(
        'video',
        null,
        section_id,
        null,
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
      video_citation: item.citation,
      video_cover_image: item.coverImage,
    }));

    return {
      section_title: section.title,
      hot_list: hot_list,
      articles_list: articles_list,
      videos_list: videos_list,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
