import { Knex } from 'knex';

export class SectionRepository {
  constructor(private readonly dataSource: Knex) {}

  async create() {}

  async findAll() {}

  async findByGroupId() {}

  async findById() {}

  async deleteByGroupId() {}

  async deleteById() {}
}
