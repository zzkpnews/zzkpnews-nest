import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { NewsListRepository } from './news-list-item.repository';

export const NewsListProviders: Provider[] = [
  {
    provide: DependenceFlags.NewsListRepository,
    useClass: NewsListRepository,
  },
];
