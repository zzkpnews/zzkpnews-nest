import { PageTemplateUtils } from './utils';

export interface GroupIndexPageTemplate extends PageTemplateUtils {
  index: {
    groupId: string;
    groupTitle: string;

    articlesList: {
      newsId: string;
      articleTitle: string;
      articleSubtitle: string | null;
      articleCoverImage: string | null;
    }[];

    videosList: {
      newsId: string;
      videoTitle: string;
      videoSubtitle: string | null;
      videoCoverImage: string | null;
    }[];
  }[];
}
