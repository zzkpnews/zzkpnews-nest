import { DependenceFlags } from '@/constant/dep-flags';
import { Provider } from '@nestjs/common';
import { VideoRepository } from './video.repository';

export const VideoProviders: Provider[] = [
  {
    provide: DependenceFlags.VideoRepository,
    useClass: VideoRepository,
  },
];
