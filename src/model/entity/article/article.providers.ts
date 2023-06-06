import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { ArticleRepository } from './article.repository';

export const ArticleProviders: Provider[] = [
  {
    provide: DependenceFlags.ArticleRepository,
    useClass: ArticleRepository,
  },
];
