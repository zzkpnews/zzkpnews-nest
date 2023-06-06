import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { BookIndexPageTemplateService } from './book-index-page-template.service';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  providers: [BookIndexPageTemplateService],
  exports: [BookIndexPageTemplateService],
})
export class BookIndexPageTemplateModule {}
