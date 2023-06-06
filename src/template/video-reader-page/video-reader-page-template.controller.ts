import { VideoReaderPageTemplate } from '@/interface/template/VideoReaderPageTemplate';
import { Controller, Get, Param } from '@nestjs/common';
import { VideoReaderPageTemplateService } from './video-reader-page-template.service';

@Controller('/template/video-reader')
export class VideoReaderPageTemplateController {
  constructor(
    private readonly videoReaderPageTemplateService: VideoReaderPageTemplateService,
  ) {}

  @Get(':news_id')
  async get(
    @Param('news_id') news_id: string,
  ): Promise<VideoReaderPageTemplate> {
    return await this.videoReaderPageTemplateService.get(news_id);
  }
}
