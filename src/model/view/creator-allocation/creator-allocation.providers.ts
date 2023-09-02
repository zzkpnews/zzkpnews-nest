import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { CreatorAllocationRepository } from './creator-allocation.repository';

export const CreatorAllocationProviders: Provider[] = [
  {
    provide: DependenceFlags.BooksListItemRepository,
    useClass: CreatorAllocationRepository,
  },
];
