import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { BookListItemRepository } from './book-list-item.repository';

export const BookListItemProviders: Provider[] = [
  {
    provide: DependenceFlags.BooksListItemRepository,
    useClass: BookListItemRepository,
  },
];
