export type GetVideoAPI = {
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
  belongingTopicId: string;
  videoUrl: string;
  author: string;
  editor: string;
  originUrl: string;
  origin: string;
};
