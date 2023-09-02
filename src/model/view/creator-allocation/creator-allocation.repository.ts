import { DependenceFlags } from '@/constant/dep-flags';
import { SectionAllocationTable, TopicAllocationTable } from '@/types/tables';
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class CreatorAllocationRepository {
  constructor(@Inject(DependenceFlags.DataSource) private readonly dataSource: Knex) {}

  async getSectionAllocation(creatorId: string): Promise<string[]> {
    const query = this.dataSource<SectionAllocationTable>('section_allocation');
    const sectionAllocations = (await query.where({ creatorId: creatorId })).map((item) => item.sectionId);
    return sectionAllocations;
  }

  async getTopicAllocation(creatorId: string): Promise<string[]> {
    const query = this.dataSource<TopicAllocationTable>('topic_allocation');
    const topicAllocations = (await query.where({ creatorId: creatorId })).map((item) => item.topicId);
    return topicAllocations;
  }
}
