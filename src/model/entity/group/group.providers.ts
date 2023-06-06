import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { GroupRepository } from './group.repository';

export const GroupProviders: Provider[] = [
  {
    provide: DependenceFlags.GroupRepository,
    useClass: GroupRepository,
  },
];
