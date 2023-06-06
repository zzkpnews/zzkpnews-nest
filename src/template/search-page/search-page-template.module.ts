import { SearchPageTemplateController } from './search-page-template.controller';
import { SearchPageTemplateService } from './search-page-template.service';
import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  controllers: [SearchPageTemplateController],
  providers: [SearchPageTemplateService],
  exports: [SearchPageTemplateService],
})
export class SearchPageTemplateModule {}
