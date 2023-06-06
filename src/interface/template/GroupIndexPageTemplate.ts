import { PageTemplateUtils } from './utils';

export interface GroupIndexPageTemplate extends PageTemplateUtils {
  index: {
    group_id: string;
    group_title: string;

    articles_list: {
      news_id: string;
      article_title: string;
      article_subtitle: string | null;
      article_cover_image: string | null;
    }[];

    videos_list: {
      news_id: string;
      video_title: string;
      video_subtitle: string | null;
      video_cover_image: string | null;
    }[];
  }[];
}
