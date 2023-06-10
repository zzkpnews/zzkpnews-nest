import { PageTemplateUtils } from './utils';

export interface SectionIndexPageTemplate extends PageTemplateUtils {
  index: {
    sectionId: string;
    sectionTitle: string;

    recentList: {
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
    hotList: {
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
