import { VideoModule } from '@/model/entity/video/video.module';
import { Module } from '@nestjs/common';
import { GetVideoAPIController } from './get-video.controller';
import { GetVideoAPIService } from './get-video.service';

@Module({
  imports: [VideoModule],
  providers: [GetVideoAPIService],
  controllers: [GetVideoAPIController],
  exports: [GetVideoAPIService],
})
export class GetVideoAPIModule {}
