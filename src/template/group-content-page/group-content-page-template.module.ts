import { EntityModule } from '@/model/entity/entities.module';
import { GroupContentPageTemplateService } from './group-content-page-template.service';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  providers: [GroupContentPageTemplateService],
  exports: [GroupContentPageTemplateService],
})
export class GroupContentPageTemplateModule {}
