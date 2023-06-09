import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { GetBooksListAPIModule } from './get-books-list/get-books-list.module';
import { GetNewsListAPIModule } from './get-news-list/get-news-list.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ViewsModule,
    SearchModule,
    GetNewsListAPIModule,
    GetBooksListAPIModule,
  ],
})
export class ApisModule {}
