import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { BookModule } from './book/book.module';
import { CreatorModule } from './creator/creator.module';
import { GroupModule } from './group/group.module';
import { NotificationModule } from './notification/notification.module';
import { SectionModule } from './section/section.module';
import { TopicModule } from './topic/topic.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ArticleModule,
    BookModule,
    CreatorModule,
    GroupModule,
    NotificationModule,
    SectionModule,
    TopicModule,
    VideoModule,
  ],
  exports: [
    ArticleModule,
    BookModule,
    CreatorModule,
    GroupModule,
    NotificationModule,
    SectionModule,
    TopicModule,
    VideoModule,
  ],
})
export class EntityModule {}
