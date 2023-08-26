import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { GetArticleAPIModule } from './get-article/get-article.module';
import { GetBooksListAPIModule } from './get-book-list/get-book-list.module';
import { GetBookAPIModule } from './get-book/get-book.module';
import { GetNewsListAPIModule } from './get-news-list/get-news-list.module';
import { GetVideoAPIModule } from './get-video/get-video.module';
import { SearchResourceModule } from './search-resource/search-resource.module';
import { GetCreatorAPIModule } from './get-creator/get-creator.module';

@Module({
  imports: [
    ViewsModule,
    SearchResourceModule,
    GetNewsListAPIModule,
    GetBooksListAPIModule,
    GetArticleAPIModule,
    GetVideoAPIModule,
    GetCreatorAPIModule,
    GetBookAPIModule,
  ],
})
export class PublicApisModule {}
