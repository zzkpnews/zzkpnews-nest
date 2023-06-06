import { DependenceFlags } from '@/constant/dep-flags';
import { Article } from '@/model/entity/article/article.entity';
import { ArticleBaseTable, ArticleView, NewsBaseTable } from '@/types/tables';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import uuid from 'uuid';

@Injectable()
export class ArticleRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async create(
    title: string,
    subtitle: string | null,
    leadTitle: string | null,
    citation: string | null,
    coverImage: string | null,
    keywords: string | null,
    creatorId: string,
    belongingSectionId: string,
    belongingTopicId: string,
    author: string | null,
    editor: string | null,
    origin: string | null,
    originUrl: string | null,
  ): Promise<Article> {
    const id = uuid.v4();
    const timestamp = Date.now();
    return new Article(
      id,
      timestamp,
      title,
      subtitle,
      leadTitle,
      citation,
      coverImage,
      keywords,
      creatorId,
      false,
      false,
      false,
      false,
      belongingSectionId,
      belongingTopicId,
      author,
      editor,
      origin,
      originUrl,
    );
  }

  async save(article: Article): Promise<void> {
    this.dataSource.transaction((trx) => {
      trx<NewsBaseTable>('newsbase')
        .insert({
          id: article.id,
          timestamp: article.timestamp,
          title: article.title,
          subtitle: article.subtitle,
          leadTitle: article.leadTitle,
          citation: article.citation,
          coverImage: article.coverImage,
          keywords: article.keywords,
          creatorId: article.creatorId,
          homeHotMark: article.homeHotMark,
          sectionHotMark: article.sectionHotMark,
          creatorHotMark: article.creatorHotMark,
          belongingSectionId: article.belongingSectionId,
          belongingTopicId: article.belongingTopicId,
        })
        .onConflict()
        .merge()
        .then(() => {
          trx<ArticleBaseTable>('articlebase').insert({
            author: article.author,
            editor: article.editor,
            origin: article.origin,
            originUrl: article.originUrl,
          });
        })
        .catch(() => {
          trx.rollback();
        });
    });
  }

  async findById(newsId: string): Promise<Article | null> {
    const result_fields = await this.dataSource<ArticleView>(
      'article_view',
    ).where({ newsId });
    if (result_fields.length === 0) return null;
    return new Article(
      result_fields[0].newsId,
      result_fields[0].timestamp,
      result_fields[0].title,
      result_fields[0].subtitle,
      result_fields[0].leadTitle,
      result_fields[0].citation,
      result_fields[0].coverImage,
      result_fields[0].keywords,
      result_fields[0].creatorId,
      result_fields[0].closed,
      result_fields[0].homeHotMark,
      result_fields[0].sectionHotMark,
      result_fields[0].creatorHotMark,
      result_fields[0].belongingSectionId,
      result_fields[0].belongingTopicId,
      result_fields[0].author,
      result_fields[0].editor,
      result_fields[0].origin,
      result_fields[0].originUrl,
    );
  }

  async findNext(
    timestamp: number,
    offset: number,
    count: number,
  ): Promise<Article[]> {
    const result_fields = await this.dataSource<ArticleView>('article_view')
      .where('timestamp', '>', timestamp)
      .orderBy('timestamp', 'desc')
      .offset(offset)
      .limit(count);

    return result_fields.map(
      (item) =>
        new Article(
          item.newsId,
          item.timestamp,
          item.title,
          item.subtitle,
          item.leadTitle,
          item.citation,
          item.coverImage,
          item.keywords,
          item.creatorId,
          item.closed,
          item.homeHotMark,
          item.sectionHotMark,
          item.creatorHotMark,
          item.belongingSectionId,
          item.belongingTopicId,
          item.author,
          item.editor,
          item.origin,
          item.originUrl,
        ),
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.dataSource<NewsBaseTable>('newsbase').where({ id }).del();
  }
}
