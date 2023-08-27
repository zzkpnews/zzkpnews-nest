export type GetBookAPIContent = {
  id: string;
  creatorId: string;
  title: string;
  citation: string | null;
  keywords: string | null;
  coverImage: string | null;
  timestamp: number;
};
