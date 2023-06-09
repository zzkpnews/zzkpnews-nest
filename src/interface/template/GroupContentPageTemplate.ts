import { PageTemplateUtils } from './utils';

export interface GroupContentPageTemplate extends PageTemplateUtils {
  groupId: string;
  groupTitle: string;

  hotList: {
    newsId: string;
    newsType: 'article' | 'video';
    newsTitle: string;
    newsSubtitle: string | null;
    newsCoverImage: string | null;
    newsCitation: string | null;
  }[];

  articlesList: {
    content: {
      newsId: string;
      articleTitle: string;
      articleSubtitle: string | null;
      articleCoverImage: string | null;
      articleCitation: string | null;
    }[];
    pageTotal: number;
  };

  videosList: {
    content: {
      newsId: string;
      videoTitle: string;
      videoSubtitle: string | null;
      videoCoverImage: string | null;
      videoCitation: string | null;
    }[];
    pageTotal: number;
  };
}
