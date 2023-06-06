import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { ArticleReaderPageTemplateController } from './article-reader-page/article-reader-page-template.controller';
import { ArticleReaderPageTemplateModule } from './article-reader-page/article-reader-page-template.module';
import { HomePageTemplateController } from './home-page/home-page-template.controller';
import { HomePageTemplateModule } from './home-page/home-page-template.module';
import { SectionIndexPageTemplateController } from './section-index-page/section-index-page.controller';
import { TemplateUtilsModule } from './utils/template-utils.module';
import { SectionIndexPageTemplateModule } from './section-index-page/section-index-page.module';

@Module({
  imports: [
    EntityModule,
    ViewsModule,
    TemplateUtilsModule,
    ArticleReaderPageTemplateModule,
    HomePageTemplateModule,
    SectionIndexPageTemplateModule,
  ],
  controllers: [
    ArticleReaderPageTemplateController,
    HomePageTemplateController,
    SectionIndexPageTemplateController,
  ],
})
export class TemplatesModule {}
