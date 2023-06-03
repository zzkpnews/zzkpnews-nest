import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleRepository } from '@/model/entity/article/article.repository';

@Module({
  imports: [DatabaseModule],
  providers: [Article, ArticleRepository],
  exports: [Article, ArticleRepository],
})
export class ArticleModule {}
