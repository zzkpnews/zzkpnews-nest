import { BookRepository } from '@/model/entity/book/book.repository';
import { CarouselRepository } from '@/model/entity/carousel/carousel.repository';
import { DependenceFlags } from '@/constant/dep-flags';
import { Headline } from '@/model/object/headline/headline.object';
import { HomePageTemplate } from '@/interface/template/HomePageTemplate';
import { Inject, Injectable } from '@nestjs/common';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { PictureNews } from '@/model/object/picture-news/picture-news.object';
import { SpecialNews } from '@/model/object/special-news/special-news.object';
import { TemplateUtilsService } from '../utils/template-utils.service';
import { TopicRepository } from '@/model/entity/topic/topic.repository';

@Injectable()
export class HomePageTemplateService {
  constructor(
    @Inject(DependenceFlags.ObjectStorage)
    private readonly objectStorage: ObjectStorage,
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListRepository: NewsListItemRepository,
    @Inject(DependenceFlags.TopicRepository)
    private readonly topicRepository: TopicRepository,
    @Inject(DependenceFlags.CarouselRepository)
    private readonly carouselRepository: CarouselRepository,
    @Inject(DependenceFlags.BookRepository)
    private readonly bookRepository: BookRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<HomePageTemplate> {
    return {
      picture1: this.objectStorage.get<PictureNews>('picture-news1'),

      picture2: this.objectStorage.get<PictureNews>('picture-news2'),

      picture3: this.objectStorage.get<PictureNews>('picture-news3'),

      headline: this.objectStorage.get<Headline>('headline'),

      special: this.objectStorage.get<SpecialNews>('special-news'),

      carousels_list: await Promise.all(
        (
          await this.carouselRepository.findAll()
        ).map(async (item) => {
          const news_list_item = await this.newsListRepository.findById(
            item.id,
          );
          return {
            news_id: item.id,
            timestamp: news_list_item.timestamp,
            type: news_list_item.type,
            title: news_list_item.title,
            lead_title: news_list_item.leadTitle,
            subtitle: news_list_item.subtitle,
            cover_image: news_list_item.coverImage,
            citation: news_list_item.citation,
          };
        }),
      ),

      topics: (await this.topicRepository.findAll()).map((item) => ({
        id: item.id,
        title: item.title,
        logo: item.logo,
      })),

      recent_books: (await this.bookRepository.findNext(null, 0, 5)).map(
        (book) => ({
          id: book.id,
          title: book.title,
          cover_image: book.coverImage,
          citation: book.citation,
          timestamp: book.timestamp,
        }),
      ),

      hot_list: (await this.newsListRepository.findHomeHot(7)).map(
        (newsitem) => ({
          news_id: newsitem.newsId,
          type: newsitem.type,
          title: newsitem.title,
          subtitle: newsitem.subtitle,
        }),
      ),

      recent_news_list: (await this.newsListRepository.find(10)).map(
        (newsitem) => {
          return {
            news_id: newsitem.newsId,
            timestamp: newsitem.timestamp,
            keywords: newsitem.keywords,
            type: newsitem.type,
            title: newsitem.title,
            lead_title: newsitem.leadTitle,
            subtitle: newsitem.subtitle,
            section_title: newsitem.sectionTitle,
            cover_image: newsitem.coverImage,
            citation: newsitem.citation,
          };
        },
      ),

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
