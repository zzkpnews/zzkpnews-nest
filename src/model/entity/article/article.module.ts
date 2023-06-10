import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleRepository } from '@/model/entity/article/article.repository';
import { ArticleProviders } from './article.providers';

@Module({
  imports: [DatabaseModule],
  providers: [Article, ...ArticleProviders],
  exports: [Article, ...ArticleProviders],
})
export class ArticleModule {}
