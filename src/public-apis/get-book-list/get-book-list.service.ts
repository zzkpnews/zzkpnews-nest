import { DependenceFlags } from '@/constant/dep-flags';
import { GetBookListAPIContent } from '@/interface/api/get-book-list';
import { BookListItemRepository } from '@/model/view/book-list-item/book-list-item.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetBooksListService {
  constructor(
    @Inject(DependenceFlags.BooksListItemRepository)
    private readonly booksListItemRepository: BookListItemRepository,
  ) {}

  async getList(options: {
    creatorId?: string;
    timestampStart?: number;
    timestampEnd?: number;
    pageSize?: number;
    pageNum?: number;
  }): Promise<GetBookListAPIContent> {
    const book_items = await this.booksListItemRepository.find({
      creatorId: options.creatorId,
      timestampStart: options.timestampStart,
      timestampEnd: options.timestampEnd,
      pageSize:
        options.pageSize && options.pageSize < 11 ? options.pageSize : 10,
      pageNum: options.pageNum,
    });
    return book_items.map<ArrayElement<GetBookListAPIContent>>((book) => ({
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
