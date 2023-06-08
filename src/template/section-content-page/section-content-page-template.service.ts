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

    const hot_list_news_count = 10;
    const articles_list_news_count_per_page = 10;
    const videos_list_news_count_per_page = 10;

    const hot_list = (
      await this.newsListItemRepository.find({
        onlySectionHot: true,
        sectionId: section_id,
        count: hot_list_news_count,
      })
    ).map((item) => ({
      newsId: item.newsId,
      newsType: item.type,
      newsTitle: item.title,
      newsLeadTitle: item.leadTitle,
      newsSubtitle: item.subtitle,
      newsCitation: item.citation,
      newsCoverImage: item.coverImage,
    }));

    const articles_total_by_section = await this.newsListItemRepository.count({
      type: 'article',
      sectionId: section_id,
    });
    const articles_list_content = (
      await this.newsListItemRepository.find({
        type: 'article',
        sectionId: section_id,
        count: 10,
      })
    ).map((item) => ({
      newsId: item.newsId,
      articleTitle: item.title,
      articleLeadTitle: item.leadTitle,
      articleSubtitle: item.subtitle,
      articleCitation: item.citation,
      articleCoverImage: item.coverImage,
    }));

    const videos_total_by_section = await this.newsListItemRepository.count({
      type: 'video',
      sectionId: section_id,
    });
    const videos_list_content = (
      await this.newsListItemRepository.find({
        type: 'video',
        sectionId: section_id,
        count: 10,
      })
    ).map((item) => ({
      newsId: item.newsId,
      videoTitle: item.title,
      videoCitation: item.citation,
      videoCoverImage: item.coverImage,
    }));

    const articles_list_page_total = Math.ceil(
      articles_total_by_section / articles_list_news_count_per_page,
    );

    const videos_list_page_total = Math.ceil(
      videos_total_by_section / videos_list_news_count_per_page,
    );

    return {
      sectionTitle: section.title,
      hotList: hot_list,
      articlesList: {
        content: articles_list_content,
        pageTotal: articles_list_page_total,
      },
      videosList: {
        content: videos_list_content,
        pageTotal: videos_list_page_total,
      },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
