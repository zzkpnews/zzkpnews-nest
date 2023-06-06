import { DependenceFlags } from '@/constant/dep-flags';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Notification } from './notification.entity';
import uuid from 'uuid';
import { NotificationTable } from '@/types/tables';

@Injectable()
export class NotificationRepository {
  constructor(
    @Inject(DependenceFlags.DataSource)
    private readonly dataSource: Knex,
  ) {}

  async create(creatorId: string): Promise<Notification> {
    const id = uuid.v4();
    const timestamp = Date.now();
    return new Notification(id, timestamp, creatorId, false);
  }

  async save(notification: Notification) {
    await this.dataSource('notification')
      .insert({
        id: notification.id,
        timestamp: notification.timestamp,
        receiver: notification.receiver,
        read: notification.read,
      })
      .onConflict()
      .merge();
  }

  async findByCreatorId(creatorId: string): Promise<Notification[]> {
    const result_fields = await this.dataSource('notification')
      .select('id', 'timestamp', 'receiver', 'read')
      .where({ receiver: creatorId });
    return result_fields.map(
      (item) =>
        new Notification(item.id, item.timestamp, item.receiver, item.read),
    );
  }

  async deleteById(id: string) {
    await this.dataSource<NotificationTable>('notification')
      .where({ id })
      .del();
  }

  async deleteByCreatorId(creatorId: string) {
    await this.dataSource<NotificationTable>('notification')
      .where({ receiverId: creatorId })
      .del();
  }
}
