import { DependenceFlags } from '@/constants/dep-flags';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Article } from './article.entity';

export const articleProviders: Provider[] = [
  {
    provide: DependenceFlags.ArticleRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Article),
    inject: [DependenceFlags.DataSource],
  },
];
