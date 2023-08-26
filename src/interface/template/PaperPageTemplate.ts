import { PageTemplateUtils } from './utils';

export interface PaperPageTemplate extends PageTemplateUtils {
  title: string;
  subtitle?: string;
  timestamp: number;
  content: string;
}
