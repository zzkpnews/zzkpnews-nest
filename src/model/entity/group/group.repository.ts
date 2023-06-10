import { DependenceFlags } from '@/constant/dep-flags';
import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { Group } from './group.entity';
import { GroupTable, SectionTable } from '@/types/tables';
import { Section } from '../section/section.entity';

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
    const result_fields = await this.dataSource<GroupTable>('group');
    const result: Group[] = result_fields.map(
      (item) => new Group(item.id, item.title, item.order),
    );
    return result;
  }

  async findSections(groupId: string): Promise<Section[]> {
    const result_fields = await this.dataSource<SectionTable>('section').where({
      belongingGroupId: groupId,
    });
    return result_fields.map(
      (item) =>
        new Section(item.id, item.title, item.order, item.belongingGroupId),
    );
  }

  async save(group: Group) {
    await this.dataSource<GroupTable>('group')
      .insert({
        id: group.id,
        title: group.title,
        order: group.order,
      })
      .onConflict()
      .merge();
  }

  async deleteById(id: string) {
    await this.dataSource<GroupTable>('group').where({ id }).del();
  }
}
