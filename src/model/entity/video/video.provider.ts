import { DependenceFlags } from '@/constants/dep-flags';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Video } from './video.entity';

export const topicProviders: Provider[] = [
  {
    provide: DependenceFlags.VideoRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Video),
    inject: [DependenceFlags.DataSource],
  },
];
