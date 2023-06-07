import { DependenceFlags } from '@/constant/dep-flags';
import { VideoReaderPageTemplate } from '@/interface/template/VideoReaderPageTemplate';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { VideoRepository } from '@/model/entity/video/video.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateUtilsService } from '../utils/template-utils.service';
import { NewsListItemRepository } from '@/model/view/news-list-item/news-list-item.repository';

@Injectable()
export class VideoReaderPageTemplateService {
  constructor(
    @Inject(DependenceFlags.VideoRepository)
    private readonly videoRepository: VideoRepository,
    @Inject(DependenceFlags.NewsListItemRepository)
    private readonly newsListItemRepository: NewsListItemRepository,
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
    private readonly templateUtils: TemplateUtilsService,
  ) {}
  async get(news_id: string): Promise<VideoReaderPageTemplate> {
    const video = await this.videoRepository.findById(news_id);

    const creator = await this.creatorRepository.findById(video.creatorId);

    const next_list = (
      await this.newsListItemRepository.find({
        type: 'video',
        timestamp_offset: video.timestamp,
        count: 7,
      })
    ).map((next_video) => ({
      news_id: next_video.newsId,
      video_title: next_video.title,
      video_subtitle: next_video.subtitle,
      video_cover_image: next_video.coverImage,
    }));

    return {
      video_title: video.title,
      video_subtitle: video.subtitle,
      video_lead_title: video.leadTitle,
      video_timestamp: video.timestamp,
      video_author: video.author,
      video_editor: video.editor,
      video_creator_logo: creator.logo,
      video_creator_description: creator.description,
      video_creator_id: creator.id,
      video_creator_title: creator.title,
      video_video_url: video.videoUrl,

      play_list: next_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
