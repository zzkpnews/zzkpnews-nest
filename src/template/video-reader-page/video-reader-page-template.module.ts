import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { VideoReaderPageTemplateController } from './video-reader-page-template.controller';
import { VideoReaderPageTemplateService } from './video-reader-page-template.service';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  controllers: [VideoReaderPageTemplateController],
  providers: [VideoReaderPageTemplateService],
  exports: [VideoReaderPageTemplateService],
})
export class VideoReaderPageTemplateModule {}
