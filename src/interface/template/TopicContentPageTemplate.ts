import { PageTemplate } from './utils';

export interface TopicContentPageTemplate extends PageTemplate {
  topic: {
    logo: string;
    description: string;
    title: string;
    cover_image: string;
  };

  news_list: {
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
}
