export type GetBookListItem = {
  bookId: string;
  bookTitle: string;
  bookCoverImage: string | null;
  bookCitation: string | null;
  bookTimestamp: number;
  creatorId: string;
  creatorTitle: string;
};
