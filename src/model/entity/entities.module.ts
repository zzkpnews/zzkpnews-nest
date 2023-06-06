import { Module } from '@nestjs/common';
import { NewsListRepository } from '../view/news-list-item/news-list-item.repository';
import { ArticleModule } from './article/article.module';
import { BookModule } from './book/book.module';
import { CreatorModule } from './creator/creator.module';
import { FriendModule } from './friend/friend.module';
import { GroupModule } from './group/group.module';
import { NotificationModule } from './notification/notification.module';
import { SectionModule } from './section/section.module';
import { TopicModule } from './topic/topic.module';
import { VideoModule } from './video/video.module';
import { CarouselModule } from './carousel/carousel.module';
import { Carousel } from './carousel/carousel.entity';

@Module({
  imports: [
    ArticleModule,
    BookModule,
    CreatorModule,
    GroupModule,
    FriendModule,
    NotificationModule,
    SectionModule,
    TopicModule,
    VideoModule,
    CarouselModule,
  ],
  exports: [
    ArticleModule,
    BookModule,
    CreatorModule,
    GroupModule,
    FriendModule,
    NotificationModule,
    SectionModule,
    TopicModule,
    VideoModule,
    CarouselModule,
  ],
})
export class EntityModule {}
