export type SearchResourceItem = {
  type: 'article' | 'video' | 'book';
  id: string;
  title: string;
  coverImage: string | null;
  description: string | null;
  timestamp: number;
};
