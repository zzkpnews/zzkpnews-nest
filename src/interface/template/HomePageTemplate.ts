import { PageTemplate } from './utils';

export interface HomePageTemplate extends PageTemplate {
  picture1: { image: string; href: string | null; description: string | null };
  picture2: { image: string; href: string | null; description: string | null };
  picture3: { image: string; href: string | null; description: string | null };

  headline: {
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    url: string;
  };

  special: {
    news_id: string;
    type: 'article' | 'video';

    title: string;
    lead_title: string | null;
    subtitle: string | null;

    cover_image: string | null;
    citation: string | null;
  };

  carousels_list: {
    news_id: string;
    timestamp: number;
    type: 'article' | 'video';

    title: string;
    lead_title: string | null;
    subtitle: string | null;

    cover_image: string | null;
    citation: string | null;
  }[];

  topics: {
    id: string;
    title: string;
    logo: string;
  }[];

  recent_books: {
    title: string;
    cover_image: string;
    id: string;
    citation: string | null;
    timestamp: number;
  }[];

  hot_list: {
    news_id: string;
    type: 'article' | 'video';
    title: string;
    subtitle: string | null;
  }[];

  recent_news_list: {
    news_id: string;
    timestamp: number;
    keywords: string | null;
    type: 'article' | 'video';
    title: string;
    lead_title: string | null;
    subtitle: string | null;
    section_title: string;
    cover_image: string | null;
    citation: string | null;
  }[];
}
