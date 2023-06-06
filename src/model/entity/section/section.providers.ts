import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { SectionRepository } from './section.repository';

export const SectionProviders: Provider[] = [
  {
    provide: DependenceFlags.SectionRepository,
    useClass: SectionRepository,
  },
];
