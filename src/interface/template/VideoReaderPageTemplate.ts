import { PageTemplateUtils } from './utils';

export interface VideoReaderPageTemplate extends PageTemplateUtils {
  video_timestamp: number;
  video_title: string;
  video_lead_title: string | null;
  video_subtitle: string | null;
  video_creator_id: string;
  video_creator_title: string;
  video_creator_logo: string | null;
  video_creator_description: string | null;
  video_video_url: string;
  video_author: string | null;
  video_editor: string | null;

  play_list: {
    video_title: string;
    video_subtitle: string;
    video_cover_image: string | null;
    news_id: string;
  }[];
}
