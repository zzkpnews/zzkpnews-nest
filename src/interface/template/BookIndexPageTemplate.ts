import { PageTemplate } from './utils';

export interface BookIndexPageTemplate extends PageTemplate {
  books: {
    title: string;
    cover_image: string;
    id: string;
    citation: string | null;
    timestamp: number;
  }[];
}
