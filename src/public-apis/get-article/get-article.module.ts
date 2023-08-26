import { ArticleModule } from '@/model/entity/article/article.module';
import { Module } from '@nestjs/common';
import { GetArticleAPIController } from './get-article.controller';
import { GetArticleAPIService } from './get-article.service';

@Module({
  imports: [ArticleModule],
  providers: [GetArticleAPIService],
  controllers: [GetArticleAPIController],
  exports: [GetArticleAPIService],
})
export class GetArticleAPIModule {}
