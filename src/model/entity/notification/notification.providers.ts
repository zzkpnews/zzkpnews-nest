import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';

export const NotificationProviders: Provider[] = [
  {
    provide: DependenceFlags.NotificationRepository,
    useClass: NotificationRepository,
  },
];
