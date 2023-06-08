import { PageTemplateUtils } from './utils';

export interface HomePageTemplate extends PageTemplateUtils {
  picture1: { image: string; href: string | null; description: string | null };
  picture2: { image: string; href: string | null; description: string | null };
  picture3: { image: string; href: string | null; description: string | null };

  headline: {
    headlineTitle: string;
    headlineLeadTitle: string | null;
    headlineSubtitle: string | null;
    headlineUrl: string;
  };

  special: {
    newsId: string;
    newsType: 'article' | 'video';
    newsTitle: string;
    newsLeadTitle: string | null;
    newsSubtitle: string | null;
    newsCoverImage: string | null;
    newsCitation: string | null;
  };

  carouselsList: {
    newsId: string;
    newsTimestamp: number;
    newsType: 'article' | 'video';
    newsTitle: string;
    newsLeadTitle: string | null;
    newsSubtitle: string | null;
    newsCoverImage: string | null;
    newsCitation: string | null;
  }[];

  topics: {
    topicId: string;
    topicTitle: string;
    topicLogo: string;
  }[];

  recentBooks: {
    bookTitle: string;
    bookCoverImage: string;
    bookId: string;
    bookCitation: string | null;
    bookTimestamp: number;
  }[];

  hotList: {
    newsId: string;
    newsType: 'article' | 'video';
    newsTitle: string;
    newsSubtitle: string | null;
  }[];

  recentNewsList: {
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
}
