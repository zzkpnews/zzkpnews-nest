import { GroupContentPageTemplateController } from './group-content-page-template.controller';
import { GroupContentPageTemplateService } from './group-content-page-template.service';
import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  controllers: [GroupContentPageTemplateController],
  providers: [GroupContentPageTemplateService],
  exports: [GroupContentPageTemplateService],
})
export class GroupContentPageTemplateModule {}
