import { DependenceFlags } from '@/constant/dep-flags';
import { ArticleReaderPageTemplate } from '@/interface/template/ArticleReaderPageTemplate';
import { ArticleRepository } from '@/model/entity/article/article.repository';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class ArticleReaderPageTemplateService {
  constructor(
    @Inject(DependenceFlags.ArticleRepository)
    private readonly articleRepository: ArticleRepository,
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(news_id: string): Promise<ArticleReaderPageTemplate> {
    const article = await this.articleRepository.findById(news_id);
    const creator = await this.creatorRepository.findById(article.creatorId);
    const next_list = (
      await this.articleRepository.findNext(article.id, 0, 7)
    ).map((next_article) => ({
      news_id: next_article.id,
      title: next_article.title,
      lead_title: next_article.leadTitle,
      subtitle: next_article.subtitle,
    }));

    return {
      title: article.title,
      subtitle: article.subtitle,
      lead_title: article.leadTitle,
      cover_image: article.coverImage,
      citation: article.citation,
      timestamp: article.timestamp,
      author: article.author,
      editor: article.editor,
      creator_logo: creator.logo,
      creator_description: creator.description,
      creator_id: creator.id,
      creator_title: creator.title,
      content: '',
      keywords: article.keywords,

      next_list: next_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
