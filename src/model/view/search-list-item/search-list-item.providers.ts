import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { SearchListItemRepository } from './search-list-item.repository';

export const SearchListItemProviders: Provider[] = [
  {
    provide: DependenceFlags.SearchListItemRepository,
    useClass: SearchListItemRepository,
  },
];
