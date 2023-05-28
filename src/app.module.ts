import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectStorage } from './repository/object-storage/object-storage';
import { NewsFeedController } from './controller/news-feed/news-feed.controller';
import { SearchController } from './controller/search/search.controller';
import { TemplateController } from './template/template.controller';
import { ImagesController } from './images/images.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    NewsFeedController,
    SearchController,
    TemplateController,
    ImagesController,
  ],
  providers: [AppService, ObjectStorage],
})
export class AppModule {}
