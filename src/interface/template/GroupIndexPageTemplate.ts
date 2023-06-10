import { PageTemplateUtils } from './utils';

export interface GroupIndexPageTemplate extends PageTemplateUtils {
  index: {
    groupId: string;
    groupTitle: string;

    articleList: {
      newsId: string;
      articleTitle: string;
      articleSubtitle: string | null;
      articleCoverImage: string | null;
    }[];

    videoList: {
      newsId: string;
      videoTitle: string;
      videoSubtitle: string | null;
      videoCoverImage: string | null;
    }[];
  }[];
}
