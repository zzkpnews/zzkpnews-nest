import { DatabaseModule } from '@/repository/database/database.module';
import { Module } from '@nestjs/common';
import { Video } from './video.entity';
import { VideoProviders } from './video.providers';

@Module({
  imports: [DatabaseModule],
  providers: [Video, ...VideoProviders],
  exports: [Video, ...VideoProviders],
})
export class VideoModule {}
