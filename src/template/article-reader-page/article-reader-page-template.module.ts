import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { ArticleReaderPageTemplateController } from './article-reader-page-template.controller';
import { ArticleReaderPageTemplateService } from './article-reader-page-template.service';
import { TemplateUtilsModule } from '../utils/template-utils.module';

@Module({
  imports: [EntityModule, TemplateUtilsModule],
  controllers: [ArticleReaderPageTemplateController],
  providers: [ArticleReaderPageTemplateService],
  exports: [ArticleReaderPageTemplateService],
})
export class ArticleReaderPageTemplateModule {}
