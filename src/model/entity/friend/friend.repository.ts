import { DependenceFlags } from '@/constant/dep-flags';
import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { Friend } from './friend.entity';
import { FriendTable } from '@/types/tables';

@Injectable()
export class FriendRepository {
  constructor(
    @Inject(DependenceFlags.DataSource)
    private readonly dataSource: Knex,
  ) {}

  async findAll(): Promise<Friend[]> {
    const result_fields = await this.dataSource<FriendTable>('friend');
    return result_fields.map((item) => new Friend(item.id, item.title, item.url, item.description));
  }
}
