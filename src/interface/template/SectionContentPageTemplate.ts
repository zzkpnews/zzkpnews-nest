import { PageTemplate } from './utils';

export interface SectionPageTemplate extends PageTemplate {
  section: {
    title: string;
  };

  hot_list: {
    news_id: string;
    type: 'article' | 'video';
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    citation: string | null;
    cover_image: string | null;
  }[];

  articles: {
    news_id: string;
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    cover_image: string | null;
    citation: string | null;
  }[];

  videos: {
    news_id: string;
    title: string;
    cover_image: string | null;
    citation: string | null;
  }[];
}
