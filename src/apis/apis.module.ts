import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { GetBooksListAPIModule } from './get-book-list/get-book-list.module';
import { GetNewsListAPIModule } from './get-news-list/get-news-list.module';
import { SearchResourceModule } from './search-resource/search-resource.module';

@Module({
  imports: [
    ViewsModule,
    SearchResourceModule,
    GetNewsListAPIModule,
    GetBooksListAPIModule,
  ],
})
export class ApisModule {}
