import { DependenceFlags } from '@/constant/dep-flags';
import { HomePageTemplate } from '@/interface/template/HomePageTemplate';
import { CarouselRepository } from '@/model/entity/carousel/carousel.repository';
import { TopicRepository } from '@/model/entity/topic/topic.repository';
import { Headline } from '@/model/object/headline/headline.object';
import { PictureNews } from '@/model/object/picture-news/picture-news.object';
import { SpecialNews } from '@/model/object/special-news/special-news.object';
import { BookListItemRepository } from '@/model/view/book-list-item/book-list-item.repository';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';
import { ConfigService } from '@nestjs/config';

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
    @Inject(DependenceFlags.BooksListItemRepository)
    private readonly booksListItemRepository: BookListItemRepository,
    private readonly templateUtils: TemplateUtilsService,
    private readonly configure: ConfigService,
  ) {}
  async get(): Promise<HomePageTemplate> {
    return {
      picture1: this.objectStorage.get<PictureNews>('picture-news1'),

      picture2: this.objectStorage.get<PictureNews>('picture-news2'),

      picture3: this.objectStorage.get<PictureNews>('picture-news3'),

      headline: this.objectStorage.get<Headline>('headline'),

      special: this.objectStorage.get<SpecialNews>('special-news'),

      carouselList: await Promise.all(
        (
          await this.carouselRepository.findAll()
        ).map(async (item) => {
          const news_list_item = await this.newsListRepository.findById(item.id);
          return {
            newsId: item.id,
            newsTimestamp: news_list_item.timestamp,
            newsType: news_list_item.type,
            newsTitle: news_list_item.title,
            newsLeadTitle: news_list_item.leadTitle,
            newsSubtitle: news_list_item.subtitle,
            newsCoverImage: news_list_item.coverImage,
            newsCitation: news_list_item.citation,
          };
        }),
      ),

      topics: (await this.topicRepository.findAll()).map((item) => ({
        topicId: item.id,
        topicTitle: item.title,
        topicLogo: item.logo,
      })),

      recentBooks: (await this.booksListItemRepository.find({ pageSize: 5 })).map((book) => ({
        bookId: book.bookId,
        bookTitle: book.title,
        bookCoverImage: book.coverImage,
        bookCitation: book.citation,
        bookTimestamp: book.timestamp,
      })),

      hotList: (
        await this.newsListRepository.find({
          pageSize: 10,
          onlyHomeHot: true,
        })
      ).map((newsitem) => ({
        newsId: newsitem.newsId,
        newsType: newsitem.type,
        newsTitle: newsitem.title,
        newsSubtitle: newsitem.subtitle,
      })),

      recentList: (
        await this.newsListRepository.find({
          pageSize: 10,
        })
      ).map((newsitem) => {
        return {
          newsId: newsitem.newsId,
          newsTimestamp: newsitem.timestamp,
          newsKeywords: newsitem.keywords,
          newsType: newsitem.type,
          newsTitle: newsitem.title,
          newsLeadTitle: newsitem.leadTitle,
          newsSubtitle: newsitem.subtitle,
          sectionTitle: newsitem.sectionTitle,
          newsCoverImage: newsitem.coverImage,
          newsCitation: newsitem.citation,
        };
      }),

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
