import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '@/model/entity/article/article.entity';
import { Creator } from '@/model/entity/creator/creator.entity';
import { Video } from '@/model/entity/video/video.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  title: string;

  @Column({ length: 2038, nullable: true })
  logo: string;

  @Column({ length: 2048, nullable: true })
  coverImage: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column('integer')
  order: number;

  @ManyToMany(() => Article, (article) => article.belongingTopic)
  @JoinTable()
  articles: Article[];

  @ManyToMany(() => Video, (video) => video.belongingTopic)
  @JoinTable()
  videos: Video[];

  @ManyToMany(() => Creator, (creator) => creator.allowedTopics)
  @JoinTable()
  allowedCreators: Creator[];
}
