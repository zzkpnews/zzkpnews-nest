import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { ArticleContentFilePath } from '@/constant/paths';
import { deleteFileIfExists } from '@/libs/file';
import { ArticleRepository } from '@/model/entity/article/article.repository';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { APIException } from '@/rc/exception/api.exception';
import { CreatorAuthTokenPayload, SuperAuthTokenPayload } from '@/types/token-payload';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as fsp from 'fs/promises';
import { SubmitArticleDTO } from './article-manage.dto';

@Injectable()
export class ArticleManageAPIService {
  constructor(
    @Inject(DependenceFlags.ArticleRepository)
    private readonly articleRepository: ArticleRepository,
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
  ) {}
  async addByCreator(authTokenPayload: CreatorAuthTokenPayload, input: SubmitArticleDTO): Promise<void> {
    const creatorId = authTokenPayload.id;
    const [errCreator, creator] = await to(this.creatorRepository.findById(creatorId));
    if (errCreator) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (creator == null) {
      throw new APIException(API_STATUS_CODE.UserNotFound, 404);
    }
    if (creator.closed) {
      throw new APIException(API_STATUS_CODE.UserBlocked, 403);
    }

    const [errNewArticle, newArticle] = await to(
      this.articleRepository.create(
        input.title,
        input.subtitle,
        input.leadTitle,
        input.citation,
        input.coverImage,
        input.keywords,
        creatorId,
        input.belongingSectionId,
        input.belongingTopicId,
        input.author,
        input.editor,
        input.origin,
        input.originUrl,
      ),
    );
    if (errNewArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    const [errSaveArticleContent] = await to(
      fsp.writeFile(ArticleContentFilePath(newArticle.id), input.content, 'utf-8'),
    );
    if (errSaveArticleContent) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    const [errSaveArticleEntity] = await to(this.articleRepository.save(newArticle));
    if (errSaveArticleEntity) {
      deleteFileIfExists(ArticleContentFilePath(newArticle.id));
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
  }

  async updateByCreator(
    authTokenPayload: CreatorAuthTokenPayload,
    newsId: string,
    input: SubmitArticleDTO,
  ): Promise<void> {
    const [errTargetArticle, targetArticle] = await to(this.articleRepository.findById(newsId));
    if (errTargetArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (targetArticle == null) {
      throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    }

    const creatorIdToValidate = authTokenPayload.id;
    const [errCreator, creator] = await to(this.creatorRepository.findById(targetArticle.creatorId));
    if (errCreator) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (creator == null) {
      throw new APIException(API_STATUS_CODE.UserNotFound, 404);
    }
    if (creator.id !== creatorIdToValidate) {
      throw new APIException(API_STATUS_CODE.UserPermissionDenied, 403);
    }
    if (creator.closed) {
      throw new APIException(API_STATUS_CODE.UserBlocked, 403);
    }

    targetArticle.title = input.title;
    targetArticle.subtitle = input.subtitle;
    targetArticle.leadTitle = input.leadTitle;
    targetArticle.citation = input.citation;
    targetArticle.coverImage = input.coverImage;
    targetArticle.keywords = input.keywords;
    targetArticle.belongingSectionId = input.belongingSectionId;
    targetArticle.belongingTopicId = input.belongingTopicId;
    targetArticle.author = input.author;
    targetArticle.editor = input.editor;
    targetArticle.origin = input.origin;
    targetArticle.originUrl = input.originUrl;

    const [errSaveArticleContent] = await to(
      fsp.writeFile(ArticleContentFilePath(targetArticle.id), input.content, 'utf-8'),
    );
    if (errSaveArticleContent) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    const [errSaveArticleEntity] = await to(this.articleRepository.save(targetArticle));
    if (errSaveArticleEntity) {
      deleteFileIfExists(ArticleContentFilePath(targetArticle.id));
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
  }

  async CreatorLocker(
    authTokenPayload: CreatorAuthTokenPayload,
    newsId: string,
    type: 'close' | 'unclose',
  ): Promise<void> {
    const [errArticle, article] = await to(this.articleRepository.findById(newsId));
    if (errArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (article == null) {
      throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    }

    const creatorIdToValidate = authTokenPayload.id;
    if (article.creatorId !== creatorIdToValidate) {
      throw new APIException(API_STATUS_CODE.UserPermissionDenied, 403);
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
  }

  async deleteByCreator(authTokenPayload: CreatorAuthTokenPayload, newsId: string): Promise<void> {
    const [errArticle, article] = await to(this.articleRepository.findById(newsId));
    if (errArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (article == null) {
      throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    }

    const creatorIdToValidate = authTokenPayload.id;
    if (article.creatorId !== creatorIdToValidate) {
      throw new APIException(API_STATUS_CODE.UserPermissionDenied, 403);
    }

    const [errDeleteArticle] = await to(this.articleRepository.deleteById(newsId));
    if (errDeleteArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
  }

  async setupSectionHotBySuper(
    authTokenPayload: SuperAuthTokenPayload,
    newsId: string,
    action: 'mark' | 'unmark',
  ): Promise<void> {
    const [errArticle, article] = await to(this.articleRepository.findById(newsId));
    if (errArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (article == null) {
      throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    }

    if (action === 'mark') {
      article.sectionHotMark = true;
    } else {
      article.sectionHotMark = false;
    }

    const [errSaveArticleEntity] = await to(this.articleRepository.save(article));
    if (errSaveArticleEntity) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
  }

  async setupHomeHotBySuper(
    authTokenPayload: SuperAuthTokenPayload,
    newsId: string,
    action: 'mark' | 'unmark',
  ): Promise<void> {
    const [errArticle, article] = await to(this.articleRepository.findById(newsId));
    if (errArticle) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (article == null) {
      throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    }

    if (action === 'mark') {
      article.sectionHotMark = true;
    } else {
      article.sectionHotMark = false;
    }

    const [errSaveArticleEntity] = await to(this.articleRepository.save(article));
    if (errSaveArticleEntity) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
  }
}
