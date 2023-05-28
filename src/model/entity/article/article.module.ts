import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { articleProviders } from './article.provider';

@Module({
  imports: [DatabaseModule],
  providers: articleProviders,
})
export class ArticleModule {}
