import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Friend } from './friend.entity';
import { FriendProviders } from './friend.providers';

@Module({
  imports: [DatabaseModule],
  providers: [Friend, ...FriendProviders],
  exports: [Friend, ...FriendProviders],
})
export class FriendModule {}
