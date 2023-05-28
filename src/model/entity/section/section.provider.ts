import { DependenceFlags } from '@/constants/dep-flags';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Section } from './section.entity';

export const sectionProviders: Provider[] = [
  {
    provide: DependenceFlags.SectionRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Section),
    inject: [DependenceFlags.DataSource],
  },
];
