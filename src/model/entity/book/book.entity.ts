import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Creator } from '@/model/entity/creator/creator.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Creator, (creator) => creator.books)
  creator: Creator;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 200 })
  citation: string;

  @Column({ length: 100, nullable: true })
  keywords: string;

  @Column({ length: 2048, nullable: true })
  coverImage: string;

  @Column('integer')
  timestamp: number;

  @Column({ default: false, nullable: true })
  closed: boolean;
}
