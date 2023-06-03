export interface SpecialNews {
  news_id: string;
  type: 'article' | 'video';

  title: string;
  lead_title: string | null;
  subtitle: string | null;

  cover_image: string | null;
  citation: string | null;
}
