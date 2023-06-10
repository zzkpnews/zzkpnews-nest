import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { CarouselRepository } from './carousel.repository';

export const CarouselProviders: Provider[] = [
  {
    provide: DependenceFlags.CarouselRepository,
    useClass: CarouselRepository,
  },
];
