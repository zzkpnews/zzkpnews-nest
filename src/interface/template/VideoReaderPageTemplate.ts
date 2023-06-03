import { PageTemplate } from './utils';

export interface VideoContentTemplate extends PageTemplate {
  video: {
    time_stamp: number;
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    creator_id: string;
    creator_title: string;
    creator_avatar: string | null;
    creator_description: string | null;
    video_url: string;
    author: string | null;
    editor: string | null;
  };

  play_list: {
    title: string;
    subtitle: string;
    cover_image: string | null;
    news_id: string;
  }[];
}
