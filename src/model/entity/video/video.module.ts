import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { topicProviders } from './video.provider';

@Module({
  imports: [DatabaseModule],
  providers: topicProviders,
})
export class VideoModule {}
