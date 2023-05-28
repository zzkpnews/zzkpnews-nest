import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { sectionProviders } from './section.provider';

@Module({
  imports: [DatabaseModule],
  providers: sectionProviders,
})
export class SectionModule {}
