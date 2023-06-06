import { PageTemplateUtils } from './utils';

export interface SectionContentPageTemplate extends PageTemplateUtils {
  section_title: string;

  hot_list: {
    news_id: string;
    type: 'article' | 'video';
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    citation: string | null;
    cover_image: string | null;
  }[];

  articles_list: {
    news_id: string;
    article_title: string;
    article_lead_title: string | null;
    article_subtitle: string | null;
    article_cover_image: string | null;
    article_citation: string | null;
  }[];

  videos_list: {
    news_id: string;
    video_title: string;
    video_cover_image: string | null;
    video_citation: string | null;
  }[];
}
