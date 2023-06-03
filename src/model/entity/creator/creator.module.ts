import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Creator } from './creator.entity';
import { CreatorRepository } from './creator.repository';

@Module({
  imports: [DatabaseModule],
  providers: [Creator, CreatorRepository],
  exports: [CreatorRepository, Creator],
})
export class CreatorModule {}
