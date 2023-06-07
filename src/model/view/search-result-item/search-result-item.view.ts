export class SearchResultItem {
  type: 'article' | 'video' | 'book';
  id: string;
  title: string;
  cover_image: string | null;
  description: string | null;
  timestamp: number;
}
