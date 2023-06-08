import { PageTemplateUtils } from './utils';

export interface TopicIndexPageTemplate extends PageTemplateUtils {
  index: {
    topicId: string;
    topicTitle: string;

    newsList: {
      newsId: string;
      newsTimestamp: number;
      newsKeywords: string | null;
      newsType: 'article' | 'video';
      newsTitle: string;
      newsLeadTitle: string | null;
      newsSubtitle: string | null;
      sectionTitle: string;
      newsCoverImage: string | null;
      newsCitation: string | null;
    }[];
  }[];
}
