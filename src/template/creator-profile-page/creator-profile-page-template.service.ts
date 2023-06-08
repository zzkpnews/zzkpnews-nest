import { DependenceFlags } from '@/constant/dep-flags';
import { CreatorProfilePageTemplate } from '@/interface/template/CreatorProfilePageTemplate';
import { BookRepository } from '@/model/entity/book/book.repository';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
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
    @Inject(DependenceFlags.BookRepository)
    private readonly bookRepository: BookRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(creator_id: string): Promise<CreatorProfilePageTemplate> {
    const creator = await this.creatorRepository.findById(creator_id);

    const recent_list_news_count_per_page = 10;
    const articles_list_news_count_per_page = 10;
    const videos_list_news_count_per_page = 10;
    const books_list_news_count_per_page = 5;
    const hot_list_news_count = 10;

    const recent_list_content = (
      await this.newsListItemRepository.find({
        creatorId: creator_id,
        count: recent_list_news_count_per_page,
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

    const articles_list_content = (
      await this.newsListItemRepository.find({
        type: 'article' as 'article' | 'video' | 'all',
        creatorId: creator_id,
        count: articles_list_news_count_per_page,
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

    const videos_list_content = (
      await this.newsListItemRepository.find({
        type: 'video' as 'article' | 'video' | 'all',
        creatorId: creator_id,
        count: videos_list_news_count_per_page,
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

    const books_list_content = (
      await this.bookRepository.find({
        creatorId: creator_id,
        count: books_list_news_count_per_page,
      })
    ).map((book) => ({
      bookTitle: book.title,
      bookCoverImage: book.coverImage,
      bookId: book.id,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
    }));

    const hot_list = (
      await this.newsListItemRepository.find({
        creatorId: creator_id,
        count: hot_list_news_count,
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
    const recent_news_list_page_total = Math.ceil(
      news_total_by_creator / recent_list_news_count_per_page,
    );

    const articles_total_by_creator = await this.newsListItemRepository.count({
      creatorId: creator_id,
      type: 'article',
    });
    const articles_list_page_total = Math.ceil(
      articles_total_by_creator / articles_list_news_count_per_page,
    );

    const videos_total_by_creator = await this.newsListItemRepository.count({
      creatorId: creator_id,
      type: 'video',
    });
    const videos_list_page_total = Math.ceil(
      videos_total_by_creator / videos_list_news_count_per_page,
    );

    const books_total_by_creator = await this.bookRepository.count({
      creatorId: creator_id,
    });
    const books_list_page_total = Math.ceil(
      books_total_by_creator / books_list_news_count_per_page,
    );

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
        pageTotal: recent_news_list_page_total,
      },
      articlesList: {
        content: articles_list_content,
        pageTotal: articles_list_page_total,
      },
      videosList: {
        content: videos_list_content,
        pageTotal: videos_list_page_total,
      },
      booksList: {
        content: books_list_content,
        pageTotal: books_list_page_total,
      },
      hotList: hot_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
