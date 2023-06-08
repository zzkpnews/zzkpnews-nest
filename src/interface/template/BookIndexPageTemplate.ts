import { PageTemplateUtils } from './utils';

export interface BookIndexPageTemplate extends PageTemplateUtils {
  booksList: {
    content: {
      bookId: string;
      bookTitle: string;
      bookCoverImage: string | null;
      bookCitation: string | null;
      bookTimestamp: number;
    }[];
    pageTotal: number;
  };
}
