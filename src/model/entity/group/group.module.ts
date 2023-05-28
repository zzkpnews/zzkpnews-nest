import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { groupProviders } from './group.provider';

@Module({
  imports: [DatabaseModule],
  providers: groupProviders,
})
export class GroupModule {}
