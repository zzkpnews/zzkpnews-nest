import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Article } from '@/model/entity/article/article.entity';
import { Creator } from '@/model/entity/creator/creator.entity';
import { Group } from '@/model/entity/group/group.entity';
import { Video } from '@/model/entity/video/video.entity';

@Entity()
export class Section {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ length: 50 })
  title: string;

  @Column('integer')
  order: number;

  @ManyToOne(() => Group, (group) => group.sections)
  belongingGroup: Group;

  @OneToMany(() => Article, (article) => article.belongingSection, {
    cascade: true,
  })
  articles: Article[];

  @OneToMany(() => Video, (video) => video.belongingSection, {
    cascade: true,
  })
  videos: Video[];

  @ManyToMany(() => Creator, (creator) => creator.allowedSections)
  @JoinTable()
  allowedCreators: Creator[];
}
