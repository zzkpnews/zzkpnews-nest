import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Group } from './group.entity';
import { GroupProviders } from './group.providers';

@Module({
  imports: [DatabaseModule],
  providers: [Group, ...GroupProviders],
  exports: [Group, ...GroupProviders],
})
export class GroupModule {}
