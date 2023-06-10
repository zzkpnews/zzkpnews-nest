import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { BookRepository } from './book.repository';

export const BookProviders: Provider[] = [
  {
    provide: DependenceFlags.BookRepository,
    useClass: BookRepository,
  },
];
