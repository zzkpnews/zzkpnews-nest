import { DependenceFlags } from '@/constants/dep-flags';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Creator } from './creator.entity';

export const creatorProviders: Provider[] = [
  {
    provide: DependenceFlags.CreatorRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Creator),
    inject: [DependenceFlags.DataSource],
  },
];
