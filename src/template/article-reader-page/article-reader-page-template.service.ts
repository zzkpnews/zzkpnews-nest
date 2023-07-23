import * as fsp from 'fs/promises';
import to from 'await-to-js';
import { API_STATUS_CODE } from '@/constant/api-status-code';
import { APIException } from '@/exception/api.exception';
import { ArticleContentFilePath } from '@/constant/paths';
import { ArticleReaderPageTemplate } from '@/interface/template/ArticleReaderPageTemplate';
import { ArticleRepository } from '@/model/entity/article/article.repository';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { isFileAccessible } from '@/utils/file';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { TemplateUtilsService } from '../utils/template-utils.service';

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
    const [errArticle, article] = await to(this.articleRepository.findById(news_id));
    if (errArticle) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    if (article == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);

    const [errCreator, creator] = await to(this.creatorRepository.findById(article.creatorId));
    if (creator === null || errCreator) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    if (!isFileAccessible(ArticleContentFilePath(article.id))) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    const [errArticleContent, articleContent] = await to(fsp.readFile(ArticleContentFilePath(article.id), 'utf-8'));
    if (errArticleContent) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const nextListSize = 7;

    const [errNextItems, nextItems] = await to(
      this.newsListItemRepository.find({
        type: 'article',
        timestampEnd: article.timestamp,
        pageSize: nextListSize,
      }),
    );
    if (errNextItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const nextList = nextItems.map((next_article) => ({
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
      articleContent: articleContent,
      articleKeywords: article.keywords,

      nextList: nextList,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
