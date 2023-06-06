import { PageTemplateUtils } from './utils';

export interface ArticleReaderPageTemplate extends PageTemplateUtils {
  article_title: string;
  article_subtitle: string | null;
  article_lead_title: string | null;
  article_cover_image: string | null;
  article_citation: string | null;
  article_timestamp: number;
  article_author: string | null;
  article_editor: string | null;
  article_creator_logo: string | null;
  article_creator_description: string | null;
  article_creator_id: string;
  article_creator_title: string;
  article_content: string;
  article_keywords: string | null;

  next_list: {
    news_id: string;
    article_title: string;
    article_lead_title: string | null;
    article_subtitle: string | null;
  }[];
}
