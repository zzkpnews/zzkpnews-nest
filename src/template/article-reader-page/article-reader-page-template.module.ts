import { Module } from '@nestjs/common';
import { ArticleReaderPageTemplateController } from './article-reader-page-template.controller';
import { ArticleReaderPageTemplateService } from './article-reader-page-template.service';

@Module({
  controllers: [ArticleReaderPageTemplateController],
  providers: [ArticleReaderPageTemplateService],
})
export class ArticleReaderPageTemplateModule {}
