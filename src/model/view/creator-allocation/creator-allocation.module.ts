import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { CreatorAllocationProviders } from './creator-allocation.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...CreatorAllocationProviders],
  exports: [...CreatorAllocationProviders],
})
export class CreatorAllocationModule {}
