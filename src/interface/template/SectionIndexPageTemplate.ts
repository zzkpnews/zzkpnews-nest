import { PageTemplate } from './utils';

export interface SectionIndexPageTemplate extends PageTemplate {
  index: {
    section: {
      id: string;
      title: string;
    };
    recent_list: {
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
    hot_list: {
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
  }[];
}
