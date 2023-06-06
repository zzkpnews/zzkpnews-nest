import { PageTemplateUtils } from './utils';

export interface TopicIndexPageTemplate extends PageTemplateUtils {
  index: {
    topic_id: string;
    topic_title: string;

    news_list: {
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
