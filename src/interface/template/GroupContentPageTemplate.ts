import { PageTemplateUtils } from './utils';

export interface GroupContentPageTemplate extends PageTemplateUtils {
  group_id: string;
  group_title: string;

  hot_list: {
    news_id: string;
    type: 'article' | 'video';
    title: string;
    subtitle: string | null;
    cover_image: string | null;
    citation: string | null;
  }[];

  articles_list: {
    news_id: string;
    article_title: string;
    article_subtitle: string | null;
    article_cover_image: string | null;
    article_citation: string | null;
  }[];

  videos_list: {
    news_id: string;
    video_title: string;
    video_subtitle: string | null;
    video_cover_image: string | null;
    video_citation: string | null;
  }[];
}
