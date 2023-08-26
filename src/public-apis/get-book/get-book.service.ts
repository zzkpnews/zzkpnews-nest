import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { GetBookAPI } from '@/interface/api/get-book';
import { BookRepository } from '@/model/entity/book/book.repository';
import { APIException } from '@/rc/exception/api.exception';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';

@Injectable()
export class GetBookAPIService {
  constructor(
    @Inject(DependenceFlags.BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}
  async get(newsId: string): Promise<GetBookAPI | null> {
    const [errBook, book] = await to(this.bookRepository.findById(newsId));
    if (errBook) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    if (book == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);

    return {
      id: book.id,
      creatorId: book.creatorId,
      title: book.title,
      citation: book.citation,
      keywords: book.keywords,
      coverImage: book.coverImage,
      timestamp: book.timestamp,
    };
  }
}
