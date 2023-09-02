import { ArticleModule } from '@/model/entity/article/article.module';
import { Module } from '@nestjs/common';
import { ArticleManageAPIController } from './article-manage.controller';
import { ArticleManageAPIService } from './article-manage.service';
import { EntityModule } from '@/model/entity/entities.module';

@Module({
  imports: [EntityModule],
  providers: [ArticleManageAPIService],
  controllers: [ArticleManageAPIController],
  exports: [ArticleManageAPIService],
})
export class ArticleManageAPIModule {}
