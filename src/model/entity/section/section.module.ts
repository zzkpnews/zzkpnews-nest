import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Section } from './section.entity';
import { SectionRepository } from './section.repository';

@Module({
  imports: [DatabaseModule],
  providers: [Section, SectionRepository],
})
export class SectionModule {}
