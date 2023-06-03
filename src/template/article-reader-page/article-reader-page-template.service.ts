import { DependenceFlags } from '@/constant/dep-flags';
import { ArticleReaderPageTemplate } from '@/interface/template/ArticleReaderPageTemplate';
import { Article } from '@/model/entity/article/article.entity';
import { Book } from '@/model/entity/book/book.entity';
import { NewsbaseRepository } from '@/model/entity/utils/newsbase.entity';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { Inject, Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { TemplateUtilsService } from '../utils/template-utils.service';

@Injectable()
export class ArticleReaderPageTemplateService {
  constructor(
    @Inject(DependenceFlags.ObjectStorage)
    private readonly objectStorage: ObjectStorage,
    @Inject(DependenceFlags.NewsBaseRepository)
    private readonly newsbaseRepository: Repository<NewsbaseRepository>,
    @Inject(DependenceFlags.ArticleRepository)
    private readonly articleRepository: Repository<Article>,
    @Inject(DependenceFlags.BookRepository)
    private readonly bookRepository: Repository<Book>,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(news_id: string): Promise<ArticleReaderPageTemplate> {
    const newsbase = await this.newsbaseRepository.findOneBy({ id: news_id });

    const article = await this.articleRepository
      .findOneBy({
        newsbase: newsbase.id,
      })
      .then((article) => ({
        title: newsbase.title,
        subtitle: newsbase.subtitle,
        lead_title: newsbase.leadTitle,
        cover_image: newsbase.coverImage,
        citation: newsbase.citation,
        timestamp: newsbase.timestamp,
        author: article.author,
        editor: article.editor,
        creator_logo: newsbase.creator.logo,
        creator_description: newsbase.creator.description,
        creator_id: newsbase.creator.id,
        creator_title: newsbase.creator.title,
        content: '',
        keywords: newsbase.keywords,
      }));

    const next_list = (
      await this.newsbaseRepository.find({
        where: {
          timestamp: LessThan(newsbase.timestamp),
        },
        take: 7,
      })
    ).map((newsbase) => ({
      news_id: newsbase.id,
      title: newsbase.title,
      lead_title: newsbase.leadTitle,
      subtitle: newsbase.subtitle,
    }));

    return {
      article: article,

      next_list: next_list,
      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
