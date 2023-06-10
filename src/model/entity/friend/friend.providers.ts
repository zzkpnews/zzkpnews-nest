import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { FriendRepository } from './friend.repository';

export const FriendProviders: Provider[] = [
  {
    provide: DependenceFlags.FriendRepository,
    useClass: FriendRepository,
  },
];
