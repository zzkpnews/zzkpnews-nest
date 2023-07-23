import { SectionTable } from '@/types/tables';
import { Knex } from 'knex';
import { Section } from './section.entity';
import { DependenceFlags } from '@/constant/dep-flags';
import { Inject } from '@nestjs/common';

export class SectionRepository {
  constructor(@Inject(DependenceFlags.DataSource) private readonly dataSource: Knex) {}

  async create(id: string, title: string, order: number, belongingGroupId: string) {
    return new Section(id, title, order, belongingGroupId);
  }

  async save(section: Section) {
    await this.dataSource<SectionTable>('section')
      .insert({
        id: section.id,
        title: section.title,
        order: section.order,
        belongingGroupId: section.belongingGroupId,
      })
      .onConflict()
      .merge();
  }

  async findAll(): Promise<Section[]> {
    const result_fields = await this.dataSource<SectionTable>('section');
    return result_fields.map((item) => new Section(item.id, item.title, item.order, item.belongingGroupId));
  }

  async findByGroupId(groupId: string): Promise<Section[]> {
    const result_fields = await this.dataSource<SectionTable>('section').where({
      belongingGroupId: groupId,
    });
    return result_fields.map((item) => new Section(item.id, item.title, item.order, item.belongingGroupId));
  }

  async findById(id: string): Promise<Section | null> {
    const result_fields = await this.dataSource<SectionTable>('section').where({
      id,
    });
    if (result_fields.length === 0) return null;
    return new Section(
      result_fields[0].id,
      result_fields[0].title,
      result_fields[0].order,
      result_fields[0].belongingGroupId,
    );
  }

  async deleteByGroupId(groupId: string) {
    await this.dataSource<SectionTable>('section').where({ belongingGroupId: groupId }).del();
  }

  async deleteById(id: string) {
    await this.dataSource<SectionTable>('section').where({ id }).del();
  }
}
