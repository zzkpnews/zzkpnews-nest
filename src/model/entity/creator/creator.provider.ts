import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { CreatorRepository } from './creator.repository';

export const CreatorProviders: Provider[] = [
  {
    provide: DependenceFlags.CreatorRepository,
    useClass: CreatorRepository,
  },
];
