import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Creator } from '@/model/entity/creator/creator.entity';
import { NewsBase } from '@/model/entity/newsbase/newsbase.entity';
import { Section } from '@/model/entity/section/section.entity';
import { Topic } from '@/model/entity/topic/topic.entity';

@Entity()
export class Video extends NewsBase {
  @Column({ length: 2083, nullable: true })
  videoUrl: string;

  @Column({ length: 40, nullable: true })
  author: string;

  @Column({ length: 40, nullable: true })
  editor: string;

  @Column({ length: 2083, nullable: true })
  originUrl: string;

  @Column({ length: 40, nullable: true })
  origin: string;

  @ManyToMany(() => Topic, (topic) => topic.videos)
  @JoinTable()
  belongingTopic: Topic;

  @ManyToOne(() => Section, (section) => section.videos)
  belongingSection: Section;

  @ManyToOne(() => Creator, (creator) => creator.videos)
  creator: Creator;
}
