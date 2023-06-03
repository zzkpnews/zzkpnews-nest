import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { DependenceFlags } from '@/constant/dep-flags';

@Module({
  imports: [DatabaseModule],
  providers: [
    Notification,
    {
      provide: DependenceFlags.NotificationRepository,
      useClass: NotificationRepository,
    },
  ],
})
export class NotificationModule {}
