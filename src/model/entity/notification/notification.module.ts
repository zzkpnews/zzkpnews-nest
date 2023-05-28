import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { notificationProviders } from './notification.provider';

@Module({
  imports: [DatabaseModule],
  providers: notificationProviders,
})
export class NotificationModule {}
