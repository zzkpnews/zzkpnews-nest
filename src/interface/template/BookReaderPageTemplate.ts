import { PageTemplateUtils } from './utils';

export interface BookReaderPageTemplate extends PageTemplateUtils {
  bookId: string;
  bookTitle: string;
  bookKeywords: string | null;
  bookCoverImage: string;
  bookCitation: string | null;
  bookTimestamp: number;

  creatorTitle: string;
  creatorLogo: string;
}
