import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Carousel } from './carousel.entity';
import { CarouselTable } from '@/types/tables';
import { DependenceFlags } from '@/constant/dep-flags';

@Injectable()
export class CarouselRepository {
  constructor(
    @Inject(DependenceFlags.DataSource)
    private readonly dataSource: Knex,
  ) {}

  async findAll(): Promise<Carousel[]> {
    const result_fields = await this.dataSource<CarouselTable>('carousel').orderBy('order');
    return result_fields.map((item) => new Carousel(item.newsId, item.order));
  }
}
