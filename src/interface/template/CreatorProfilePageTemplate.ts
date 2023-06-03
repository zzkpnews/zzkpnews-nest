import { PageTemplate } from './utils';

export interface CreatorProfilePageTemplate extends PageTemplate {
  creator: {
    id: string;
    title: string;
    phone: string;
    email: string;
    cover_image: string | null;
    description: string | null;
    qq: string | null;
    wechat: string | null;
    url: string | null;
    avatar: string | null;
  };

  recent_news: {
    news_id: string;
    timestamp: number;
    type: 'article' | 'video';
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    section_title: string;
    cover_image: string | null;
    citation: string | null;
  }[];

  articles: {
    news_id: string;
    timestamp: number;
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    section_title: string;
    cover_image: string | null;
    citation: string | null;
  }[];

  videos: {
    news_id: string;
    timestamp: number;
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    section_title: string;
    cover_image: string | null;
    citation: string | null;
  }[];

  books: {
    title: string;
    cover_image: string;
    id: string;
    citation: string | null;
    timestamp: number;
  }[];

  hot_news: {
    news_id: string;
    type: 'article' | 'video';
    title: string;
    subtitle: string | null;
  }[];
}
