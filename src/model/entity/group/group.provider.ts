import { DependenceFlags } from '@/constants/dep-flags';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Group } from './group.entity';

export const groupProviders: Provider[] = [
  {
    provide: DependenceFlags.GroupRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Group),
    inject: [DependenceFlags.DataSource],
  },
];
