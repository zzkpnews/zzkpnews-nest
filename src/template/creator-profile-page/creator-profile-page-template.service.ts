import { DependenceFlags } from '@/constant/dep-flags';
import { CreatorProfilePageTemplate } from '@/interface/template/CreatorProfilePageTemplate';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { BookListItemRepository } from '@/model/view/book-list-item/book-list-item.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';
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
    const creator = await this.creatorRepository.findById(creator_id);

    const recent_list_page_size = 10;
    const articles_list_page_size = 10;
    const videos_list_page_size = 10;
    const books_list_page_size = 5;
    const hot_list_news_size = 10;

    const recent_list_content = (
      await this.newsListItemRepository.find({
        creatorId: creator_id,
        pageSize: recent_list_page_size,
      })
    ).map((news_item) => ({
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

    const article_list_content = (
      await this.newsListItemRepository.find({
        type: 'article' as 'article' | 'video' | 'all',
        creatorId: creator_id,
        pageSize: articles_list_page_size,
      })
    ).map((news_item) => ({
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

    const video_list_content = (
      await this.newsListItemRepository.find({
        type: 'video' as 'article' | 'video' | 'all',
        creatorId: creator_id,
        pageSize: videos_list_page_size,
      })
    ).map((news_item) => ({
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

    const book_list_content = (
      await this.booksListItemRepository.find({
        creatorId: creator_id,
        pageSize: books_list_page_size,
      })
    ).map((book) => ({
      bookTitle: book.title,
      bookCoverImage: book.coverImage,
      bookId: book.bookId,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
    }));

    const hot_list = (
      await this.newsListItemRepository.find({
        creatorId: creator_id,
        pageSize: hot_list_news_size,
        onlyCreatorHot: true,
      })
    ).map((item) => ({
      newsId: item.newsId,
      newsType: item.type,
      newsTitle: item.title,
      newsSubtitle: item.subtitle,
    }));

    const news_total_by_creator = await this.newsListItemRepository.count({
      creatorId: creator_id,
    });
    const article_total_by_creator = await this.newsListItemRepository.count({
      creatorId: creator_id,
      type: 'article',
    });

    const video_total_by_creator = await this.newsListItemRepository.count({
      creatorId: creator_id,
      type: 'video',
    });
    const book_total_by_creator = await this.booksListItemRepository.count({
      creatorId: creator_id,
    });

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
        content: recent_list_content,
        total: news_total_by_creator,
      },
      articleList: {
        content: article_list_content,
        total: article_total_by_creator,
      },
      videoList: {
        content: video_list_content,
        total: video_total_by_creator,
      },
      bookList: {
        content: book_list_content,
        total: book_total_by_creator,
      },
      hotList: hot_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
