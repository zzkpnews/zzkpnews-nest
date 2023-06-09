import { PageTemplateUtils } from './utils';

export interface CreatorProfilePageTemplate extends PageTemplateUtils {
  creatorId: string;
  creatorTitle: string;
  creatorPhone: string;
  creatorEmail: string;
  creatorCoverImage: string | null;
  creatorDescription: string | null;
  creatorQq: string | null;
  creatorWechat: string | null;
  creatorUrl: string | null;
  creatorLogo: string | null;
  creatorAddress: string | null;

  recentList: {
    content: {
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

  articleList: {
    content: {
      newsId: string;
      articleTimestamp: number;
      articleTitle: string;
      articleLeadTitle: string | null;
      articleSubtitle: string | null;
      sectionTitle: string;
      articleCoverImage: string | null;
      articleCitation: string | null;
    }[];
    total: number;
  };

  videoList: {
    content: {
      newsId: string;
      videoTimestamp: number;
      videoTitle: string;
      videoLeadTitle: string | null;
      videoSubtitle: string | null;
      sectionTitle: string;
      videoCoverImage: string | null;
      videoCitation: string | null;
    }[];
    total: number;
  };

  bookList: {
    content: {
      bookTitle: string;
      bookCoverImage: string;
      bookId: string;
      bookCitation: string | null;
      bookTimestamp: number;
    }[];
    total: number;
  };

  hotList: {
    newsId: string;
    newsType: 'article' | 'video';
    newsTitle: string;
    newsSubtitle: string | null;
  }[];
}
