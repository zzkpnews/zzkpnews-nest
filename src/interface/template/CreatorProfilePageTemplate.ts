import { PageTemplateUtils } from './utils';

export interface CreatorProfilePageTemplate extends PageTemplateUtils {
  creator_id: string;
  creator_title: string;
  creator_phone: string;
  creator_email: string;
  creator_cover_image: string | null;
  creator_description: string | null;
  creator_qq: string | null;
  creator_wechat: string | null;
  creator_url: string | null;
  creator_avatar: string | null;

  recent_list: {
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

  articles_list: {
    news_id: string;
    article_timestamp: number;
    article_title: string;
    article_lead_title: string | null;
    article_subtitle: string | null;
    article_section_title: string;
    article_cover_image: string | null;
    article_citation: string | null;
  }[];

  videos_list: {
    news_id: string;
    video_timestamp: number;
    video_title: string;
    video_lead_title: string | null;
    video_subtitle: string | null;
    video_section_title: string;
    video_cover_image: string | null;
    video_citation: string | null;
  }[];

  books_list: {
    book_title: string;
    book_cover_image: string;
    book_id: string;
    book_citation: string | null;
    book_timestamp: number;
  }[];

  hot_list: {
    news_id: string;
    type: 'article' | 'video';
    title: string;
    subtitle: string | null;
  }[];
}
