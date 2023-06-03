import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { TopicRepository } from './topic.repository';

@Module({
  imports: [DatabaseModule],
  providers: [Topic, TopicRepository],
})
export class TopicModule {}
