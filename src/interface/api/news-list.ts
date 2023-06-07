export type NewsListItem = {
  news_id: string;
  type: string;
  title: string;
  subtitle: string | null;
  lead_title: string | null;
  citation: string | null;
  timestamp: number;
  creator_id: string;
  creator_title: string;
  section_id: string;
  section_title: string;
  group_id: string;
  group_title: string;
  cover_image: string | null;
  keywords: string | null;
};
