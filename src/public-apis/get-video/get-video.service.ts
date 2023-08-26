import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { GetVideoAPI } from '@/interface/api/get-video';
import { VideoRepository } from '@/model/entity/video/video.repository';
import { APIException } from '@/rc/exception/api.exception';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';

@Injectable()
export class GetVideoAPIService {
  constructor(
    @Inject(DependenceFlags.VideoRepository)
    private readonly videoRepository: VideoRepository,
  ) {}
  async get(newsId: string): Promise<GetVideoAPI | null> {
    const [errVideo, video] = await to(this.videoRepository.findById(newsId));
    if (errVideo) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    if (video == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);

    return {
      id: video.id,
      timestamp: video.timestamp,
      title: video.title,
      subtitle: video.subtitle,
      leadTitle: video.leadTitle,
      citation: video.citation,
      coverImage: video.coverImage,
      keywords: video.keywords,
      creatorId: video.creatorId,
      homeHotMark: video.homeHotMark,
      sectionHotMark: video.sectionHotMark,
      creatorHotMark: video.creatorHotMark,
      belongingSectionId: video.belongingSectionId,
      belongingTopicId: video.belongingTopicId,
      videoUrl: video.videoUrl,
      author: video.author,
      editor: video.editor,
      origin: video.origin,
      originUrl: video.originUrl,
    };
  }
}
