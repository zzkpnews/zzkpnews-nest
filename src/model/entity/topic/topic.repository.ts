import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Topic } from './topic.entity';
import { TopicTable } from '@/types/tables';

@Injectable()
export class TopicRepository {
  constructor(
    @Inject(DependenceFlags.DataSource)
    private readonly dataSource: Knex,
  ) {}

  async create(id: string, title: string, logo: string, coverImage: string, description: string, order: number) {
    return new Topic(id, title, logo, coverImage, description, order);
  }

  async save(topic: Topic) {
    await this.dataSource<TopicTable>('topic').insert({
      id: topic.id,
      title: topic.title,
      logo: topic.logo,
      coverImage: topic.coverImage,
      description: topic.description,
      order: topic.order,
    });
  }

  async findById(id: string): Promise<Topic | null> {
    const result_fields = await this.dataSource<TopicTable>('topic').where({
      id,
    });
    if (result_fields.length === 0) return null;
    return new Topic(
      result_fields[0].id,
      result_fields[0].title,
      result_fields[0].logo,
      result_fields[0].coverImage,
      result_fields[0].description,
      result_fields[0].order,
    );
  }

  async findAll(): Promise<Topic[]> {
    const result_fields = await this.dataSource<TopicTable>('topic').orderBy('order');
    return result_fields.map(
      (item) => new Topic(item.id, item.title, item.logo, item.coverImage, item.description, item.order),
    );
  }

  async deleteById(id: string) {
    await this.dataSource<TopicTable>('topic').where({ id }).del();
  }
}
