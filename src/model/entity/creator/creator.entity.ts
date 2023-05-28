import { Article } from '@/model/entity/article/article.entity';
import { Book } from '@/model/entity/book/book.entity';
import { Notification } from '@/model/entity/notification/notification.entity';
import { Section } from '@/model/entity/section/section.entity';
import { Topic } from '@/model/entity/topic/topic.entity';
import { Video } from '@/model/entity/video/video.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Creator {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  address: string;

  @Column({ length: 15, nullable: true })
  qq: string;

  @Column({ length: 50, nullable: true })
  wechat: string;

  @Column({ length: 50, nullable: true })
  weibo: string;

  @Column({ length: 2038, nullable: true })
  url: string;

  @Column({ length: 2038, nullable: true })
  logo: string;

  @Column({ length: 40, nullable: true })
  salt: string;

  @Column({ length: 130, nullable: true })
  passwordHash: string;

  @Column({ default: false })
  closed: boolean;

  @OneToMany(() => Book, (book) => book.creator, {
    cascade: true,
  })
  books: Book[];

  @OneToMany(() => Article, (article) => article.creator, {
    cascade: true,
  })
  articles: Article[];

  @OneToMany(() => Video, (video) => video.creator, {
    cascade: true,
  })
  videos: Video[];

  @ManyToMany(() => Section, (section) => section.allowedCreators)
  @JoinTable()
  allowedSections: Section[];

  @ManyToMany(() => Topic, (topic) => topic.allowedCreators)
  @JoinTable()
  allowedTopics: Topic[];

  @OneToMany(() => Notification, (notification) => notification.receiver, {
    cascade: true,
  })
  notifications: Notification[];
}
