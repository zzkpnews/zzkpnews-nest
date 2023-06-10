import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Carousel } from './carousel.entity';
import { CarouselProviders } from './carousel.provider';

@Module({
  imports: [DatabaseModule],
  providers: [Carousel, ...CarouselProviders],
  exports: [Carousel, ...CarouselProviders],
})
export class CarouselModule {}
