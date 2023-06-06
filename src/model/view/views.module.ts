import { Module } from '@nestjs/common';
import { NewsListModule } from './news-list-item/news-list-item.module';

@Module({
  imports: [NewsListModule],
  exports: [NewsListModule],
})
export class ViewsModule {}
