export class BooksListItem {
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
