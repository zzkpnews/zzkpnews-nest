import { PageTemplateUtils } from './utils';

export interface BookIndexPageTemplate extends PageTemplateUtils {
  books_list: {
    book_id: string;
    book_title: string;
    book_cover_image: string | null;
    book_citation: string | null;
    book_timestamp: number;
  }[];
}
