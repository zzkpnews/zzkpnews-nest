import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class NewsBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 12 })
  timestamp: string;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 50, nullable: true })
  subtitle: string;

  @Column({ length: 50, nullable: true })
  leadTitle: string;

  @Column({ length: 300, nullable: true })
  citation: string;

  @Column({ length: 2083, nullable: true })
  coverImage: string;

  @Column({ length: 100, nullable: true })
  keywords: string;

  @Column({ default: false })
  closed: boolean;
}
