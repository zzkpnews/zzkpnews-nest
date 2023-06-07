import { DependenceFlags } from '@/constant/dep-flags';
import { ArticleReaderPageTemplate } from '@/interface/template/ArticleReaderPageTemplate';
import { ArticleRepository } from '@/model/entity/article/article.repository';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';

@Injectable()
export class ArticleReaderPageTemplateService {
  constructor(
    @Inject(DependenceFlags.ArticleRepository)
    private readonly articleRepository: ArticleRepository,
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListItemRepository: NewsListItemRepository,
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(news_id: string): Promise<ArticleReaderPageTemplate> {
    const article = await this.articleRepository.findById(news_id);

    const creator = await this.creatorRepository.findById(article.creatorId);

    const next_list = (
      await this.newsListItemRepository.find({
        type: 'article',
        timestamp_offset: article.timestamp,
        count: 7,
      })
    ).map((next_article) => ({
      news_id: next_article.newsId,
      article_title: next_article.title,
      article_subtitle: next_article.subtitle,
    }));

    return {
      article_title: article.title,
      article_subtitle: article.subtitle,
      article_lead_title: article.leadTitle,
      article_cover_image: article.coverImage,
      article_citation: article.citation,
      article_timestamp: article.timestamp,
      article_author: article.author,
      article_editor: article.editor,
      article_creator_logo: creator.logo,
      article_creator_description: creator.description,
      article_creator_id: creator.id,
      article_creator_title: creator.title,
      article_content: '',
      article_keywords: article.keywords,

      next_list: next_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
