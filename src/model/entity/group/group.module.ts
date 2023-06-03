import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { Group } from './group.entity';

@Module({
  imports: [DatabaseModule],
  providers: [Group, GroupRepository],
  exports: [Group, GroupRepository],
})
export class GroupModule {}
