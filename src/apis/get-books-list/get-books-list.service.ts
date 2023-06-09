import { DependenceFlags } from '@/constant/dep-flags';
import { GetBooksListItem } from '@/interface/api/get-books-list';
import { BooksListItemRepository } from '@/model/view/books-list-item/books-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetBooksListService {
  constructor(
    @Inject(DependenceFlags.BooksListItemRepository)
    private readonly booksListItemRepository: BooksListItemRepository,
  ) {}

  async getList(options: {
    sectionId?: string;
    creatorId?: string;
    groupId?: string;
    topicId?: string;
    onlyHomeHot?: boolean;
    onlySectionHot?: boolean;
    onlyCreatorHot?: boolean;
    type?: 'article' | 'video' | 'all';
    timestampOffset?: number;
    count?: number;
  }): Promise<GetBooksListItem[]> {
    const book_items = await this.booksListItemRepository.find({
      creatorId: options.creatorId,
      timestampOffset: options.timestampOffset,
      count: options.count && options.count < 11 ? options.count : 10,
    });
    return book_items.map<GetBooksListItem>((book) => ({
      bookId: book.bookId,
      bookTitle: book.title,
      bookCoverImage: book.coverImage,
      bookCitation: book.citation,
      bookTimestamp: book.timestamp,
      creatorId: book.creatorId,
      creatorTitle: book.creatorTitle,
    }));
  }
}
