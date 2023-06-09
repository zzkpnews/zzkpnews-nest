import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { BooksListItemRepository } from './books-list-item.repository';

export const BooksListItemProviders: Provider[] = [
  {
    provide: DependenceFlags.BooksListItemRepository,
    useClass: BooksListItemRepository,
  },
];
