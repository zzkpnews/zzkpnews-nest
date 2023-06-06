import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { BookIndexPageTemplateController } from './book-index-page-template.controller';
import { BookIndexPageTemplateService } from './book-index-page-template.service';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  controllers: [BookIndexPageTemplateController],
  providers: [BookIndexPageTemplateService],
  exports: [BookIndexPageTemplateService],
})
export class BookIndexPageTemplateModule {}
