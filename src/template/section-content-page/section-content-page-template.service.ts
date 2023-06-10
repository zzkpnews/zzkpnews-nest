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

    const hot_list_page_size = 8;
    const article_list_page_size = 8;
    const video_list_page_size = 8;

    const hot_list = (
      await this.newsListItemRepository.find({
        onlySectionHot: true,
        sectionId: section_id,
        pageSize: hot_list_page_size,
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
        pageSize: article_list_page_size,
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
        pageSize: video_list_page_size,
      })
    ).map((item) => ({
      newsId: item.newsId,
      videoTitle: item.title,
      videoCitation: item.citation,
      videoCoverImage: item.coverImage,
    }));

    return {
      sectionId: section.id,
      sectionTitle: section.title,
      hotList: hot_list,
      articleList: {
        content: articles_list_content,
        total: articles_total_by_section,
      },
      videoList: {
        content: videos_list_content,
        total: videos_total_by_section,
      },
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
