import { PageTemplateUtils } from './utils';

export interface ArticleReaderPageTemplate extends PageTemplateUtils {
  articleTitle: string;
  articleSubtitle: string | null;
  articleLeadTitle: string | null;
  articleCoverImage: string | null;
  articleCitation: string | null;
  articleTimestamp: number;
  articleAuthor: string | null;
  articleEditor: string | null;
  creatorLogo: string | null;
  creatorDescription: string | null;
  creatorId: string;
  creatorTitle: string;
  articleContent: string;
  articleKeywords: string | null;

  nextList: {
    newsId: string;
    articleTitle: string;
    articleSubtitle: string | null;
  }[];
}
