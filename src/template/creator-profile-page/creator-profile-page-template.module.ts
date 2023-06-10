import { CreatorProfilePageTemplateService } from './creator-profile-page-template.service';
import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  providers: [CreatorProfilePageTemplateService],
  exports: [CreatorProfilePageTemplateService],
})
export class CreatorProfilePageTemplateModule {}
