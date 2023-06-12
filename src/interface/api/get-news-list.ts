export type GetNewsListAPIContent = {
  newsId: string;
  newsType: 'article' | 'video';
  newsTitle: string;
  newsSubtitle: string | null;
  newsLeadTitle: string | null;
  newsCitation: string | null;
  newsTimestamp: number;
  creatorId: string;
  creatorTitle: string;
  sectionId: string;
  sectionTitle: string;
  groupId: string;
  groupTitle: string;
  topicId: string;
  topicTitle: string;
  newsCoverImage: string | null;
  newsKeywords: string | null;
}[];
