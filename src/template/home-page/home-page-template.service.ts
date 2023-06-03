import { DependenceFlags } from '@/constant/dep-flags';
import { HomePageTemplate } from '@/interface/template/HomePageTemplate';
import { Book } from '@/model/entity/book/book.entity';
import { NewsbaseRepository } from '@/model/entity/utils/newsbase.entity';
import { Topic } from '@/model/entity/topic/topic.entity';
import { CarouselNews } from '@/model/object/carousel-news/carousel-news.object';
import { Headline } from '@/model/object/headline/headline.object';
import { PictureNews } from '@/model/object/picture-news/picture-news.object';
import { SpecialNews } from '@/model/object/special-news/special-news.object';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class HomePageTemplateService {
  constructor(
    @Inject(DependenceFlags.ObjectStorage)
    private readonly objectStorage: ObjectStorage,
    @Inject(DependenceFlags.NewsBaseRepository)
    private readonly newsbaseRepository: Repository<NewsbaseRepository>,
    @Inject(DependenceFlags.TopicRepository)
    private readonly topicRepository: Repository<Topic>,
    @Inject(DependenceFlags.BookRepository)
    private readonly bookRepository: Repository<Book>,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(): Promise<HomePageTemplate> {
    const picture_news1 = this.objectStorage.get<PictureNews>('picture-news1');
    const picture_news2 = this.objectStorage.get<PictureNews>('picture-news2');
    const picture_news3 = this.objectStorage.get<PictureNews>('picture-news3');

    const headline = this.objectStorage.get<Headline>('headline');
    const special_news = this.objectStorage.get<SpecialNews>('special-news');
    const carousel_news = this.objectStorage.get<CarouselNews>('carousel-news');

    const topics = (
      await this.topicRepository.find({ order: { order: 'ASC' } })
    ).map((item) => ({
      id: item.id,
      title: item.title,
      logo: item.logo,
    }));

    const books = (
      await this.bookRepository.find({ order: { timestamp: 'DESC' }, take: 5 })
    ).map((book) => ({
      id: book.id,
      title: book.title,
      cover_image: book.coverImage,
      citation: book.citation,
      timestamp: book.timestamp,
    }));

    const hot_list = (
      await this.newsbaseRepository.find({
        order: { timestamp: 'DESC' },
        take: 7,
      })
    ).map((newsitem) => ({
      news_id: newsitem.id,
      type: newsitem.type,
      title: newsitem.title,
      subtitle: newsitem.subtitle,
    }));

    const news_list = (
      await this.newsbaseRepository.find({
        order: { timestamp: 'DESC' },
        take: 10,
      })
    ).map((newsitem) => ({
      news_id: newsitem.id,
      timestamp: newsitem.timestamp,
      keywords: newsitem.keywords,
      type: newsitem.type,
      title: newsitem.title,
      lead_title: newsitem.leadTitle,
      subtitle: newsitem.subtitle,
      section_title: newsitem.belongingSection.title,
      cover_image: newsitem.coverImage,
      citation: newsitem.citation,
    }));

    return {
      picture1: picture_news1,
      picture2: picture_news2,
      picture3: picture_news3,
      headline: headline,
      special: special_news,
      carousels: carousel_news,
      topics: topics,
      books: books,
      hot_list: hot_list,
      news_list: news_list,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
