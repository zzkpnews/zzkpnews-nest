import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Section } from './section.entity';
import { SectionProviders } from './section.providers';

@Module({
  imports: [DatabaseModule],
  providers: [Section, ...SectionProviders],
  exports: [Section, ...SectionProviders],
})
export class SectionModule {}
