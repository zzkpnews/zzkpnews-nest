import { PageTemplateUtils } from './utils';

export interface TopicContentPageTemplate extends PageTemplateUtils {
  topicId: string;
  topicLogo: string;
  topicDescription: string;
  topicTitle: string;
  topicCoverImage: string;

  newsList: {
    initialList: {
      newsId: string;
      newsTimestamp: number;
      newsType: 'article' | 'video';
      newsTitle: string;
      newsLeadTitle: string | null;
      newsSubtitle: string | null;
      sectionTitle: string;
      newsCoverImage: string | null;
      newsCitation: string | null;
    }[];
    total: number;
  };
}
