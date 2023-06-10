import { PageTemplateUtils } from './utils';

export interface TopicContentPageTemplate extends PageTemplateUtils {
  topicLogo: string;
  topicDescription: string;
  topicTitle: string;
  topicCoverImage: string;

  newsList: {
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
}
