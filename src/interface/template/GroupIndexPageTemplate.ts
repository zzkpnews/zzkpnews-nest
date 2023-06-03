import { PageTemplate } from './utils';

export interface GroupIndexPageTemplate extends PageTemplate {
  group_index: {
    group: {
      id: string;
      title: string;
    };
    articles: {
      news_id: string;
      title: string;
      subtitle: string | null;
      cover_image: string | null;
    }[];
    videos: {
      news_id: string;
      title: string;
      subtitle: string | null;
      cover_image: string | null;
    }[];
  }[];
}
