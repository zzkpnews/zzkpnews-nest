import { PageTemplate } from './utils';

export interface GroupContentPageTemplate extends PageTemplate {
  group: {
    id: string;
    title: string;
  };

  hot_list: {
    news_id: string;
    type: 'article' | 'video';
    title: string;
    subtitle: string | null;
    cover_image: string | null;
    citation: string | null;
  }[];

  articles: {
    news_id: string;
    title: string;
    subtitle: string | null;
    cover_image: string | null;
    citation: string | null;
  }[];

  videos: {
    news_id: string;
    title: string;
    subtitle: string | null;
    cover_image: string | null;
    citation: string | null;
  }[];
}
