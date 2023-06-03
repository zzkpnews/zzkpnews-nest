import { PageTemplate } from './utils';

export interface BookReaderPageTemplate extends PageTemplate {
  book: {
    title: string;
    keywords: string | null;
    cover_image: string;
    id: string;
    citation: string | null;
    timestamp: number;
  };
}
