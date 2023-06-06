import { PageTemplateUtils } from './utils';

export interface TopicContentPageTemplate extends PageTemplateUtils {
  topic_logo: string;
  topic_description: string;
  topic_title: string;
  topic_cover_image: string;

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
