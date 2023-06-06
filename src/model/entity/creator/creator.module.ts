import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Creator } from './creator.entity';
import { CreatorProviders } from './creator.provider';

@Module({
  imports: [DatabaseModule],
  providers: [Creator, ...CreatorProviders],
  exports: [Creator, ...CreatorProviders],
})
export class CreatorModule {}
