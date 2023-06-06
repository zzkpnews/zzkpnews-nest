export class NewsListItem {
  newsId: string;
  timestamp: number;
  title: string;
  creatorTitle: string;
  creatorId: string;
  sectionTitle: string;
  sectionId: string;
  topicTitle: string | null;
  topicId: string | null;
  groupTitle: string;
  groupId: string;
  subtitle: string;
  leadTitle: string;
  citation: string;
  keywords: string | null;
  coverImage: string | null;
  homeHotMark: boolean;
  sectionHotMark: boolean;
  creatorHotMark: boolean;
  type: 'article' | 'video';
}
