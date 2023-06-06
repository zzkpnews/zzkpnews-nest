import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { TopicRepository } from './topic.repository';

export const TopicProviders: Provider[] = [
  {
    provide: DependenceFlags.TopicRepository,
    useClass: TopicRepository,
  },
];
