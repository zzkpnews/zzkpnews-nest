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
      newsId: next_article.newsId,
      articleTitle: next_article.title,
      articleSubtitle: next_article.subtitle,
    }));

    return {
      articleTitle: article.title,
      articleSubtitle: article.subtitle,
      articleLeadTitle: article.leadTitle,
      articleCoverImage: article.coverImage,
      articleCitation: article.citation,
      articleTimestamp: article.timestamp,
      articleAuthor: article.author,
      articleEditor: article.editor,
      creatorLogo: creator.logo,
      creatorDescription: creator.description,
      creatorId: creator.id,
      creatorTitle: creator.title,
      articleContent: '',
      articleKeywords: article.keywords,

      nextList: next_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
