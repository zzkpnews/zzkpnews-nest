import { Creator } from '@/model/entity/creator/creator.entity';
import { NewsBase } from '@/model/entity/newsbase/newsbase.entity';
import { Section } from '@/model/entity/section/section.entity';
import { Topic } from '@/model/entity/topic/topic.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Article extends NewsBase {
  @Column({ length: 40, nullable: true })
  author: string;

  @Column({ length: 40, nullable: true })
  editor: string;

  @Column({ length: 40, nullable: true })
  origin: string;

  @Column({ length: 2083, nullable: true })
  originUrl: string;

  @ManyToOne(() => Section, (section) => section.articles)
  belongingSection: Section;

  @ManyToMany(() => Topic, (topic) => topic.articles)
  @JoinTable()
  belongingTopic: Topic;

  @ManyToOne(() => Creator, (creator) => creator.articles)
  creator: Creator;
}
