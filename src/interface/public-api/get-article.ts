export type GetArticleAPIContent = {
  id: string;
  timestamp: number;
  title: string;
  subtitle: string | null;
  leadTitle: string | null;
  citation: string | null;
  coverImage: string | null;
  keywords: string | null;
  creatorId: string;
  homeHotMark: boolean;
  sectionHotMark: boolean;
  creatorHotMark: boolean;
  belongingSectionId: string;
  belongingTopicId: string | null;
  author: string | null;
  editor: string | null;
  origin: string | null;
  originUrl: string | null;

  content: string | null;
};
