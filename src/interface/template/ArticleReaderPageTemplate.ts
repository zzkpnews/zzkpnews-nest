import { PageTemplate } from './utils';

export interface ArticleReaderPageTemplate extends PageTemplate {
  title: string;
  subtitle: string | null;
  lead_title: string | null;
  cover_image: string | null;
  citation: string | null;
  timestamp: number;
  author: string | null;
  editor: string | null;
  creator_logo: string | null;
  creator_description: string | null;
  creator_id: string;
  creator_title: string;
  content: string;
  keywords: string | null;

  next_list: {
    news_id: string;
    title: string;
    lead_title: string | null;
    subtitle: string | null;
  }[];
}
