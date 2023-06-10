import { PageTemplateUtils } from './utils';

export interface SectionContentPageTemplate extends PageTemplateUtils {
  sectionId: string;
  sectionTitle: string;

  hotList: {
    newsId: string;
    newsType: 'article' | 'video';
    newsTitle: string;
    newsLeadTitle: string | null;
    newsSubtitle: string | null;
    newsCitation: string | null;
    newsCoverImage: string | null;
  }[];

  articleList: {
    content: {
      newsId: string;
      articleTitle: string;
      articleLeadTitle: string | null;
      articleSubtitle: string | null;
      articleCoverImage: string | null;
      articleCitation: string | null;
    }[];
    total: number;
  };

  videoList: {
    content: {
      newsId: string;
      videoTitle: string;
      videoCoverImage: string | null;
      videoCitation: string | null;
    }[];
    total: number;
  };
}
