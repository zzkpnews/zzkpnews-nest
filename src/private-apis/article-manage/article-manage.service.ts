import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { ArticleContentFilePath } from '@/constant/paths';
import { AddArticleAPIContent, ArticleLockerAPIContent } from '@/interface/private-api/article-manage';
import { deleteFileIfExists } from '@/libs/file';
import { ArticleRepository } from '@/model/entity/article/article.repository';
import { APIException } from '@/rc/exception/api.exception';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as fsp from 'fs/promises';

@Injectable()
export class ArticleManageAPIService {
  constructor(
    @Inject(DependenceFlags.ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {}
  async add(
    title: string,
    subtitle: string | null,
    leadTitle: string | null,
    citation: string | null,
    coverImage: string | null,
    keywords: string | null,
    creatorId: string,
    belongingSectionId: string,
    belongingTopicId: string | null,
    author: string | null,
    editor: string | null,
    origin: string | null,
    originUrl: string | null,
    content: string,
  ): Promise<AddArticleAPIContent | null> {
    const [errNewArticle, newArticle] = await to(
      this.articleRepository.create(
        title,
        subtitle,
        leadTitle,
        citation,
        coverImage,
        keywords,
        creatorId,
        belongingSectionId,
        belongingTopicId,
        author,
        editor,
        origin,
        originUrl,
      ),
    );
    if (errNewArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    const [errSaveArticleContent] = await to(fsp.writeFile(ArticleContentFilePath(newArticle.id), content, 'utf-8'));
    if (errSaveArticleContent) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    const [errSaveArticleEntity] = await to(this.articleRepository.save(newArticle));
    if (errSaveArticleEntity) {
      deleteFileIfExists(ArticleContentFilePath(newArticle.id));
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    return true;
  }

  async update(
    newsId: string,
    title: string,
    subtitle: string | null,
    leadTitle: string | null,
    citation: string | null,
    coverImage: string | null,
    keywords: string | null,
    belongingSectionId: string,
    belongingTopicId: string | null,
    author: string | null,
    editor: string | null,
    origin: string | null,
    originUrl: string | null,
    content: string,
  ): Promise<AddArticleAPIContent | null> {
    const [errTargetArticle, targetArticle] = await to(this.articleRepository.findById(newsId));
    if (errTargetArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (targetArticle == null) {
      throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    }

    targetArticle.title = title;
    targetArticle.subtitle = subtitle;
    targetArticle.leadTitle = leadTitle;
    targetArticle.citation = citation;
    targetArticle.coverImage = coverImage;
    targetArticle.keywords = keywords;
    targetArticle.belongingSectionId = belongingSectionId;
    targetArticle.belongingTopicId = belongingTopicId;
    targetArticle.author = author;
    targetArticle.editor = editor;
    targetArticle.origin = origin;
    targetArticle.originUrl = originUrl;

    const [errSaveArticleContent] = await to(fsp.writeFile(ArticleContentFilePath(targetArticle.id), content, 'utf-8'));
    if (errSaveArticleContent) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    const [errSaveArticleEntity] = await to(this.articleRepository.save(targetArticle));
    if (errSaveArticleEntity) {
      deleteFileIfExists(ArticleContentFilePath(targetArticle.id));
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    return true;
  }

  async locker(newsId: string, type: 'close' | 'unclose'): Promise<ArticleLockerAPIContent> {
    const [errArticle, article] = await to(this.articleRepository.findById(newsId));
    if (errArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (article == null) {
      throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    }
    if (type === 'close') {
      article.closed = true;
    } else {
      article.closed = false;
    }
    const [errSaveArticleEntity] = await to(this.articleRepository.save(article));
    if (errSaveArticleEntity) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    return true;
  }

  async delete(newsId: string) {
    const [errDeleteArticle] = await to(this.articleRepository.deleteById(newsId));
    if (errDeleteArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    return true;
  }
}
