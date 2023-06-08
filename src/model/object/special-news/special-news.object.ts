export interface SpecialNews {
  newsId: string;
  newsType: 'article' | 'video';

  newsTitle: string;
  newsLeadTitle: string | null;
  newsSubtitle: string | null;

  newsCoverImage: string | null;
  newsCitation: string | null;
}
