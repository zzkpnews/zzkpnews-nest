export interface NewsBase {
  readonly id: string;
  readonly timestamp: number;
  title: string;
  subtitle: string | null;
  leadTitle: string | null;
  citation: string | null;
  coverImage: string | null;
  keywords: string | null;
  creatorId: string;
  closed: boolean;
  homeHotMark: boolean;
  sectionHotMark: boolean;
  creatorHotMark: boolean;
  belongingSectionId: string;
  belongingTopicId: string;
}
