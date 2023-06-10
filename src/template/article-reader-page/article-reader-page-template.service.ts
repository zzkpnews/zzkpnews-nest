import { DependenceFlags } from '@/constant/dep-flags';
import { ArticleReaderPageTemplate } from '@/interface/template/ArticleReaderPageTemplate';
import { ArticleRepository } from '@/model/entity/article/article.repository';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import * as fs from 'fs';

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

    if (article == null) {
      throw new HttpException('This Article Resource Not Found', 404);
    }

    const creator = await this.creatorRepository.findById(article.creatorId);

    const article_content = fs.readFileSync(
      `./data/articles/${article.id}.html`,
      'utf-8',
    );

    const next_list_size = 7;

    const next_list = (
      await this.newsListItemRepository.find({
        type: 'article',
        timestampEnd: article.timestamp,
        pageSize: next_list_size,
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
      articleContent: article_content,
      articleKeywords: article.keywords,

      nextList: next_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
