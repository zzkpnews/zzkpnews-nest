import { ArticleModule } from '@/model/entity/article/article.module';
import { Module } from '@nestjs/common';
import { ArticleManageAPIController } from './article-manage.controller';
import { ArticleManageAPIService } from './article-manage.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTKey, JWTExpired } from '@/constant/key';

@Module({
  imports: [ArticleModule],
  providers: [ArticleManageAPIService],
  controllers: [ArticleManageAPIController],
  exports: [ArticleManageAPIService],
})
export class ArticleManageAPIModule {}
