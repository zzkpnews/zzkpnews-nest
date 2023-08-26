import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { ArticleContentFilePath } from '@/constant/paths';
import { GetArticleAPIContent } from '@/interface/api/get-article';
import { ArticleRepository } from '@/model/entity/article/article.repository';
import { APIException } from '@/rc/exception/api.exception';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as fsp from 'fs/promises';

@Injectable()
export class GetArticleAPIService {
  constructor(
    @Inject(DependenceFlags.ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {}
  async get(newsId: string): Promise<GetArticleAPIContent | null> {
    const [errArticle, article] = await to(this.articleRepository.findById(newsId));
    if (errArticle) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    if (article == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);

    const [errArticleContent, articleContent] = await to(fsp.readFile(ArticleContentFilePath(article.id), 'utf-8'));
    if (errArticleContent) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    return {
      id: article.id,
      timestamp: article.timestamp,
      title: article.title,
      subtitle: article.subtitle,
      leadTitle: article.leadTitle,
      citation: article.citation,
      coverImage: article.coverImage,
      keywords: article.keywords,
      creatorId: article.creatorId,
      homeHotMark: article.homeHotMark,
      sectionHotMark: article.sectionHotMark,
      creatorHotMark: article.creatorHotMark,
      belongingSectionId: article.belongingSectionId,
      belongingTopicId: article.belongingTopicId,
      author: article.author,
      editor: article.editor,
      origin: article.origin,
      originUrl: article.originUrl,

      content: articleContent,
    };
  }
}
