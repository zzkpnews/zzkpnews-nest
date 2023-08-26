import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { ArticleReaderPageTemplateModule } from './article-reader-page/article-reader-page-template.module';
import { BookIndexPageTemplateModule } from './book-index-page/book-index-page-template.module';
import { BookReaderPageTemplateModule } from './book-reader-page/book-reader-page-template.module';
import { CreatorProfilePageTemplateModule } from './creator-profile-page/creator-profile-page-template.module';
import { HomePageTemplateModule } from './home-page/home-page-template.module';
import { SectionIndexPageTemplateModule } from './section-index-page/section-index-page.module';
import { TemplateUtilsModule } from './utils/template-utils.module';
import { Error404PageTemplateModule } from './error-404-page/error-404-page-template.module';
import { Error500PageTemplateModule } from './error-500-page/error-500-page-template.module';
import { SearchPageTemplateModule } from './search-page/search-page-template.module';
import { GroupContentPageTemplateModule } from './group-content-page/group-content-page-template.module';
import { SectionContentPageTemplateModule } from './section-content-page/section-content-page-template.module';
import { TopicContentPageTemplateModule } from './topic-content-page/topic-content-page-template.module';
import { TopicIndexPageTemplateModule } from './topic-index-page/topic-index-page.module';
import { VideoReaderPageTemplateModule } from './video-reader-page/video-reader-page-template.module';
import { TemplatesController } from './templates.controller';
import { GroupIndexPageTemplateModule } from './group-index-page/group-index-page.module';
import { Error403PageTemplateModule } from './error-403-page/error-403-page-template.module';
import { PaperPageTemplateModule } from './paper-page/paper-page-template.module';

@Module({
  imports: [
    ArticleReaderPageTemplateModule,
    BookIndexPageTemplateModule,
    BookReaderPageTemplateModule,
    CreatorProfilePageTemplateModule,
    EntityModule,
    Error404PageTemplateModule,
    Error404PageTemplateModule,
    Error500PageTemplateModule,
    GroupContentPageTemplateModule,
    GroupIndexPageTemplateModule,
    HomePageTemplateModule,
    SearchPageTemplateModule,
    SectionContentPageTemplateModule,
    SectionIndexPageTemplateModule,
    TemplateUtilsModule,
    TopicContentPageTemplateModule,
    TopicIndexPageTemplateModule,
    ViewsModule,
    VideoReaderPageTemplateModule,
    PaperPageTemplateModule,
    Error403PageTemplateModule,
    Error404PageTemplateModule,
    Error500PageTemplateModule,
  ],
  controllers: [TemplatesController],
})
export class TemplatesModule {}
