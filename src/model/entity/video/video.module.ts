import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Video } from './video.entity';
import { VideoRepository } from './video.repository';

@Module({
  imports: [DatabaseModule],
  providers: [Video, VideoRepository],
})
export class VideoModule {}
