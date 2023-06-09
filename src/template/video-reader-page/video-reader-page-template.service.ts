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

    const play_list_size = 7;

    const play_list = (
      await this.newsListItemRepository.find({
        type: 'video',
        timestampEnd: video.timestamp,
        pageSize: play_list_size,
      })
    ).map((next_video) => ({
      newsId: next_video.newsId,
      videoTitle: next_video.title,
      videoSubtitle: next_video.subtitle,
      videoCoverImage: next_video.coverImage,
    }));

    return {
      videoTitle: video.title,
      videoSubtitle: video.subtitle,
      videoLeadTitle: video.leadTitle,
      videoTimestamp: video.timestamp,
      videoAuthor: video.author,
      videoEditor: video.editor,
      creatorLogo: creator.logo,
      creatorDescription: creator.description,
      creatorId: creator.id,
      creatorTitle: creator.title,
      videoUrl: video.videoUrl,
      videoCitation: video.citation,

      playList: play_list,

      ...(await this.templateUtils.getTemplateUtils()),
    };
  }
}
