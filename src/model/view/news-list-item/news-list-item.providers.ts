import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { NewsListItemRepository } from './news-list-item.repository';

export const NewsListItemProviders: Provider[] = [
  {
    provide: DependenceFlags.NewsListItemRepository,
    useClass: NewsListItemRepository,
  },
];
