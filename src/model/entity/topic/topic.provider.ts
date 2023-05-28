import { DependenceFlags } from '@/constants/dep-flags';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Topic } from './topic.entity';

export const topicProviders: Provider[] = [
  {
    provide: DependenceFlags.TopicRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Topic),
    inject: [DependenceFlags.DataSource],
  },
];
