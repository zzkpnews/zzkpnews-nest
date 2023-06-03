import { DependenceFlags } from '@/constant/dep-flags';
import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { Group } from './group.entity';

export class GroupRepository {
  constructor(@Inject(DependenceFlags.DataSource) private dataSource: Knex) {}

  async create(id: string, title: string, order: number): Promise<Group> {
    return new Group(id, title, order);
  }

  async findById(id: string): Promise<Group | null> {
    const result_fields = await this.dataSource('group')
      .select('id', 'title', 'order')
      .where({ id });
    if (result_fields.length === 0) return null;
    return new Group(
      result_fields[0].id,
      result_fields[0].title,
      result_fields[0].order,
    );
  }

  async findAll(): Promise<Group[]> {
    const result_fields = await this.dataSource('group').select(
      'id',
      'title',
      'order',
    );
    const result: Group[] = result_fields.map(
      (item) => new Group(item.id, item.title, item.order),
    );
    return result;
  }

  async save(group: Group) {
    await this.dataSource('group')
      .insert({
        id: group.id,
        title: group.title,
        order: group.order,
      })
      .onConflict()
      .merge();
  }

  async deleteById(id: string) {
    await this.dataSource('group').where({ id }).del();
  }
}
