import { PageTemplateUtils } from './utils';

export interface VideoReaderPageTemplate extends PageTemplateUtils {
  videoTimestamp: number;
  videoTitle: string;
  videoLeadTitle: string | null;
  videoSubtitle: string | null;
  creatorId: string;
  creatorTitle: string;
  creatorLogo: string | null;
  creatorDescription: string | null;
  videoUrl: string;
  videoAuthor: string | null;
  videoEditor: string | null;
  videoCitation: string | null;

  playList: {
    videoTitle: string;
    videoSubtitle: string;
    videoCoverImage: string | null;
    newsId: string;
  }[];
}
