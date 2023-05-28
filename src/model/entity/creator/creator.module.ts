import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { creatorProviders } from './creator.provider';

@Module({
  imports: [DatabaseModule],
  providers: creatorProviders,
})
export class CreatorModule {}
