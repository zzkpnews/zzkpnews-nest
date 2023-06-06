import { PageTemplateUtils } from './utils';

export interface BookReaderPageTemplate extends PageTemplateUtils {
  book_title: string;
  book_keywords: string | null;
  book_cover_image: string;
  book_citation: string | null;
  book_timestamp: number;
}
