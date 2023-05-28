import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Section } from '@/model/entity/section/section.entity';

@Entity()
export class Group {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ length: 50 })
  title: string;

  @Column()
  order: number;

  @OneToMany(() => Section, (section) => section.belongingGroup, {
    cascade: true,
  })
  sections: Section;
}
