import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Creator } from '@/model/entity/creator/creator.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 12 })
  timestamp: string;

  @ManyToOne(() => Creator, (creator) => creator.notifications)
  receiver: Creator;

  @Column({ default: false })
  read: boolean;
}
