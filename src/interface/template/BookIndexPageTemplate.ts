import { PageTemplateUtils } from './utils';

export interface BookIndexPageTemplate extends PageTemplateUtils {
  bookList: {
    content: {
      bookId: string;
      bookTitle: string;
      bookCoverImage: string | null;
      bookCitation: string | null;
      bookTimestamp: number;
    }[];
    total: number;
  };
}
