import { DependenceFlags } from '@/constants/dep-flags';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Book } from './book.entity';

export const bookProviders: Provider[] = [
  {
    provide: DependenceFlags.BookRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
    inject: [DependenceFlags.DataSource],
  },
];
