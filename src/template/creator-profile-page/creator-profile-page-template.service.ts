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

    const recent_list = (
      await this.newsListItemRepository.filterFind(
        'all',
        creator_id,
        null,
        null,
        null,
        false,
        false,
        false,
        0,
        10,
      )
    ).map((news_item) => ({
      news_id: news_item.newsId,
      timestamp: news_item.timestamp,
      type: news_item.type,
      title: news_item.title,
      lead_title: news_item.leadTitle,
      subtitle: news_item.subtitle,
      section_title: news_item.sectionTitle,
      cover_image: news_item.coverImage,
      citation: news_item.citation,
    }));

    const articles_list = (
      await this.newsListItemRepository.filterFind(
        'article',
        creator_id,
        null,
        null,
        null,
        false,
        false,
        false,
        0,
        10,
      )
    ).map((news_item) => ({
      news_id: news_item.newsId,
      article_timestamp: news_item.timestamp,
      article_type: news_item.type,
      article_title: news_item.title,
      article_lead_title: news_item.leadTitle,
      article_subtitle: news_item.subtitle,
      article_section_title: news_item.sectionTitle,
      article_cover_image: news_item.coverImage,
      article_citation: news_item.citation,
    }));

    const videos_list = (
      await this.newsListItemRepository.filterFind(
        'video',
        creator_id,
        null,
        null,
        null,
        false,
        false,
        false,
        0,
        10,
      )
    ).map((news_item) => ({
      news_id: news_item.newsId,
      video_timestamp: news_item.timestamp,
      video_type: news_item.type,
      video_title: news_item.title,
      video_lead_title: news_item.leadTitle,
      video_subtitle: news_item.subtitle,
      video_section_title: news_item.sectionTitle,
      video_cover_image: news_item.coverImage,
      video_citation: news_item.citation,
    }));

    const books_list = (
      await this.bookRepository.findByCreatorId(creator_id, 0, 10)
    ).map((book) => ({
      book_title: book.title,
      book_cover_image: book.coverImage,
      book_id: book.id,
      book_citation: book.citation,
      book_timestamp: book.timestamp,
    }));

    const hot_list = (
      await this.newsListItemRepository.filterFind(
        'all',
        creator_id,
        null,
        null,
        null,
        false,
        true,
        false,
        0,
        10,
      )
    ).map((item) => ({
      news_id: item.newsId,
      type: item.type,
      title: item.title,
      subtitle: item.subtitle,
    }));

    return {
      creator_id: creator.id,
      creator_title: creator.title,
      creator_phone: creator.phone,
      creator_email: creator.email,
      creator_cover_image: creator.coverImage,
      creator_description: creator.description,
      creator_qq: creator.qq,
      creator_wechat: creator.wechat,
      creator_url: creator.url,
      creator_avatar: creator.logo,

      recent_list: recent_list,
      articles_list: articles_list,
      videos_list: videos_list,
      books_list: books_list,
      hot_list: hot_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
