import { DependenceFlags } from '@/constant/dep-flags';
import { NewsBaseTable, VideoBaseTable, VideoView } from '@/types/tables';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import uuid from 'uuid';
import { Video } from './video.entity';

@Injectable()
export class VideoRepository {
  constructor(
    @Inject(DependenceFlags.DataSource) private readonly dataSource: Knex,
  ) {}

  async create(
    title: string,
    subtitle: string | null,
    leadTitle: string | null,
    citation: string | null,
    coverImage: string | null,
    keywords: string | null,
    creatorId: string,
    belongingSectionId: string,
    belongingTopicId: string,
    videoUrl: string,
    author: string | null,
    editor: string | null,
    origin: string | null,
    originUrl: string | null,
  ): Promise<Video> {
    const id = uuid.v4();
    const timestamp = Date.now();
    return new Video(
      id,
      timestamp,
      title,
      subtitle,
      leadTitle,
      citation,
      coverImage,
      keywords,
      creatorId,
      false,
      false,
      false,
      false,
      belongingSectionId,
      belongingTopicId,
      videoUrl,
      author,
      editor,
      origin,
      originUrl,
    );
  }

  async save(video: Video): Promise<void> {
    this.dataSource.transaction((trx) => {
      trx<NewsBaseTable>('newsbase')
        .insert({
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
        })
        .onConflict()
        .merge()
        .then(() => {
          trx<VideoBaseTable>('videobase').insert({
            videoUrl: video.videoUrl,
            author: video.author,
            editor: video.editor,
            origin: video.origin,
            originUrl: video.originUrl,
          });
        })
        .catch(() => {
          trx.rollback();
        });
    });
  }

  async findById(id: string): Promise<Video | null> {
    const result_fields = await this.dataSource<VideoView>('video_view').where({
      id,
    });
    if (result_fields.length === 0) return null;
    return new Video(
      result_fields[0].id,
      result_fields[0].timestamp,
      result_fields[0].title,
      result_fields[0].subtitle,
      result_fields[0].leadTitle,
      result_fields[0].citation,
      result_fields[0].coverImage,
      result_fields[0].keywords,
      result_fields[0].creatorId,
      result_fields[0].closed,
      result_fields[0].homeHotMark,
      result_fields[0].sectionHotMark,
      result_fields[0].creatorHotMark,
      result_fields[0].belongingSectionId,
      result_fields[0].belongingTopicId,
      result_fields[0].videoUrl,
      result_fields[0].author,
      result_fields[0].editor,
      result_fields[0].origin,
      result_fields[0].originUrl,
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.dataSource<NewsBaseTable>('newsbase').where({ id }).del();
  }
}
