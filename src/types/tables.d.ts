export interface ArticleBaseTable {
  newsId: string;
  author: string | null;
  editor: string | null;
  origin: string | null;
  originUrl: string | null;
}

export interface VideoBaseTable {
  newsId: string;
  videoUrl: string | null;
  author: string | null;
  editor: string | null;
  originUrl: string | null;
  origin: string | null;
}

export interface CarouselTable {
  newsId: string;
  order: number;
}

export interface CreatorTable {
  id: string;
  title: string;
  phone: string;
  email: string;
  description: string | null;
  address: string | null;
  qq: string | null;
  wechat: string | null;
  weibo: string | null;
  url: string | null;
  logo: string | null;
  salt: string;
  passwordHash: string;
  coverImage: string | null;
  closed: boolean;
}

export interface FriendTable {
  id: string | null;
  title: string;
  url: string | null;
  description: string | null;
}

export interface GroupTable {
  id: string;
  title: string;
  order: number;
}

export interface NewsBaseTable {
  id: string;
  timestamp: number;
  title: string;
  subtitle: string | null;
  leadTitle: string | null;
  citation: string | null;
  coverImage: string | null;
  keywords: string | null;
  closed: boolean;
  type: 'article' | 'video';
  homeHotMark: boolean;
  sectionHotMark: boolean;
  creatorHotMark: boolean;
  creatorId: string | null;
  belongingSectionId: string | null;
  belongingTopicId: string | null;
}

export interface NotificationTable {
  id: string;
  timestamp: number;
  read: boolean;
  receiverId: string | null;
}

export interface SectionTable {
  id: string;
  title: string;
  order: number;
  belongingGroupId: string;
}

export interface SectionAllocationTable {
  sectionId: string;
  creatorId: string;
}

export interface TopicTable {
  id: string;
  title: string;
  logo: string | null;
  coverImage: string | null;
  description: string | null;
  order: number;
}

export interface TopicAllocationTable {
  creatorId: string;
  topicId: string;
}

export interface BookTable {
  id: string;
  title: string;
  citation: string | null;
  keywords: string | null;
  coverImage: string | null;
  timestamp: number;
  closed: boolean;
  creatorId: string;
}

export class BooksListTable {
  bookId: string;
  title: string;
  citation: string | null;
  keywords: string | null;
  coverImage: string | null;
  creatorId: string;
  creatorTitle: string;
  timestamp: number;
  closed: boolean;
}

export type ArticleView = readonly (NewsBaseTable & ArticleBaseTable);
export type VideoView = readonly (NewsBaseTable & VideoBaseTable);
