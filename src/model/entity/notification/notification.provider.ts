import { DependenceFlags } from '@/constants/dep-flags';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Notification } from './notification.entity';

export const notificationProviders: Provider[] = [
  {
    provide: DependenceFlags.NotificationRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Notification),
    inject: [DependenceFlags.DataSource],
  },
];
