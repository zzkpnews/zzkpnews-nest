import { EntityModule } from '@/model/entity/entities.module';
import { ViewsModule } from '@/model/view/views.module';
import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { GroupIndexPageTemplateService } from './group-index-page.service';

@Module({
  imports: [
    EntityModule,
    TemplateUtilsModule,
    ObjectStorageModule,
    ViewsModule,
  ],

  providers: [GroupIndexPageTemplateService],
  exports: [GroupIndexPageTemplateService],
})
export class GroupIndexPageTemplateModule {}
