import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ArticleReaderPageTemplateService } from './article-reader-page-template.service';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  providers: [ArticleReaderPageTemplateService],
  exports: [ArticleReaderPageTemplateService],
})
export class ArticleReaderPageTemplateModule {}
