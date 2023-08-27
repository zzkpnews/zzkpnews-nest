import { ArticleModule } from '@/model/entity/article/article.module';
import { Module } from '@nestjs/common';
import { ArticleManageAPIController } from './news-mark.controller';
import { ArticleManageAPIService } from './news-mark.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTKey, JWTExpired } from '@/constant/key';

@Module({
  imports: [ArticleModule],
  providers: [ArticleManageAPIService],
  controllers: [ArticleManageAPIController],
  exports: [ArticleManageAPIService],
})
export class ArticleManageAPIModule {}
