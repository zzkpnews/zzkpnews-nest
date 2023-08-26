import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { APIException } from '@/rc/exception/api.exception';
import { CreatorProfilePageTemplate } from '@/interface/template/CreatorProfilePageTemplate';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { BookListItemRepository } from '@/model/view/book-list-item/book-list-item.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class CreatorProfilePageTemplateService {
  constructor(
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListItemRepository: NewsListItemRepository,
    @Inject(DependenceFlags.BooksListItemRepository)
    private readonly booksListItemRepository: BookListItemRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(creator_id: string): Promise<CreatorProfilePageTemplate> {
    const [errCreator, creator] = await to(this.creatorRepository.findById(creator_id));
    if (creator == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);
    if (errCreator) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const recentListPageSize = 10;
    const articlesListPageSize = 10;
    const videosListPageSize = 10;
    const booksListPageSize = 5;
    const hotListSize = 10;

    const [errRecentItems, recentItems] = await to(
      this.newsListItemRepository.find({
        creatorId: creator_id,
        pageSize: recentListPageSize,
      }),
    );
    if (errRecentItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const recentListContent = recentItems.map((news_item) => ({
      newsId: news_item.newsId,
      newsTimestamp: news_item.timestamp,
      newsType: news_item.type,
      newsTitle: news_item.title,
      newsLeadTitle: news_item.leadTitle,
      newsSubtitle: news_item.subtitle,
      sectionTitle: news_item.sectionTitle,
      newsCoverImage: news_item.coverImage,
      newsCitation: news_item.citation,
    }));

    const [errArticleItems, articleItems] = await to(
      this.newsListItemRepository.find({
        type: 'article' as 'article' | 'video' | 'all',
        creatorId: creator_id,
        pageSize: articlesListPageSize,
      }),
    );
    if (errArticleItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const articleListContent = articleItems.map((news_item) => ({
      newsId: news_item.newsId,
      articleTimestamp: news_item.timestamp,
      articleType: news_item.type,
      articleTitle: news_item.title,
      articleLeadTitle: news_item.leadTitle,
      articleSubtitle: news_item.subtitle,
      sectionTitle: news_item.sectionTitle,
      articleCoverImage: news_item.coverImage,
      articleCitation: news_item.citation,
    }));

    const [errVideoItems, videoItems] = await to(
      this.newsListItemRepository.find({
        type: 'video' as 'article' | 'video' | 'all',
        creatorId: creator_id,
        pageSize: videosListPageSize,
      }),
    );
    if (errVideoItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const videoListContent = videoItems.map((news_item) => ({
      newsId: news_item.newsId,
      videoTimestamp: news_item.timestamp,
      videoType: news_item.type,
      videoTitle: news_item.title,
      videoLeadTitle: news_item.leadTitle,
      videoSubtitle: news_item.subtitle,
      sectionTitle: news_item.sectionTitle,
      videoCoverImage: news_item.coverImage,
      videoCitation: news_item.citation,
    }));

    const [errBookItems, bookItems] = await to(
      this.booksListItemRepository.find({
        creatorId: creator_id,
        pageSize: booksListPageSize,
      }),
    );
    if (errBookItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const bookListContent = bookItems.map((book) => ({
      bookTitle: book.title,
      bookCoverImage: book.coverImage,
      bookId: book.bookId,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
    }));

    const [errHotItems, hotItems] = await to(
      this.newsListItemRepository.find({
        creatorId: creator_id,
        pageSize: hotListSize,
        onlyCreatorHot: true,
      }),
    );
    if (errHotItems) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    const hotList = hotItems.map((item) => ({
      newsId: item.newsId,
      newsType: item.type,
      newsTitle: item.title,
      newsSubtitle: item.subtitle,
    }));

    const [errNewsTotal, newsTotal] = await to(
      this.newsListItemRepository.count({
        creatorId: creator_id,
      }),
    );
    if (errNewsTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const [errArticleTotal, articleTotal] = await to(
      this.newsListItemRepository.count({
        creatorId: creator_id,
        type: 'article',
      }),
    );
    if (errArticleTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const [errVideoTotal, videoTotal] = await to(
      this.newsListItemRepository.count({
        creatorId: creator_id,
        type: 'video',
      }),
    );
    if (errVideoTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    const [errBookTotal, bookTotal] = await to(
      this.booksListItemRepository.count({
        creatorId: creator_id,
      }),
    );
    if (errBookTotal) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);

    return {
      creatorId: creator.id,
      creatorTitle: creator.title,
      creatorPhone: creator.phone,
      creatorEmail: creator.email,
      creatorCoverImage: creator.coverImage,
      creatorDescription: creator.description,
      creatorQq: creator.qq,
      creatorWechat: creator.wechat,
      creatorUrl: creator.url,
      creatorLogo: creator.logo,
      creatorAddress: creator.address,

      recentList: {
        content: recentListContent,
        total: newsTotal,
      },
      articleList: {
        content: articleListContent,
        total: articleTotal,
      },
      videoList: {
        content: videoListContent,
        total: videoTotal,
      },
      bookList: {
        content: bookListContent,
        total: bookTotal,
      },
      hotList: hotList,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
