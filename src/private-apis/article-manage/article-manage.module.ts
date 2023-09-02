import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { ArticleManageAPIController } from './article-manage.controller';
import { ArticleManageAPIService } from './article-manage.service';

@Module({
  imports: [EntityModule, ViewsModule],
  providers: [ArticleManageAPIService],
  controllers: [ArticleManageAPIController],
  exports: [ArticleManageAPIService],
})
export class ArticleManageAPIModule {}
