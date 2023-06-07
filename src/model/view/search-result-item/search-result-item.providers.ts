import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { SearchResultItemRepository } from './search-result-item.repository';

export const SearchResultItemProviders: Provider[] = [
  {
    provide: DependenceFlags.SearchResultItemRepository,
    useClass: SearchResultItemRepository,
  },
];
