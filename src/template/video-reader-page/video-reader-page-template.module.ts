import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { VideoReaderPageTemplateService } from './video-reader-page-template.service';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  providers: [VideoReaderPageTemplateService],
  exports: [VideoReaderPageTemplateService],
})
export class VideoReaderPageTemplateModule {}
