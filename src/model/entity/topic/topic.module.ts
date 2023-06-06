import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { TopicProviders } from './topic.providers';

@Module({
  imports: [DatabaseModule],
  providers: [Topic, ...TopicProviders],
  exports: [Topic, ...TopicProviders],
})
export class TopicModule {}
