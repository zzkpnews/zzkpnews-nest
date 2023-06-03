import { Controller, Get, Param } from '@nestjs/common';
import { ArticleReaderPageTemplate } from '@/interface/template/ArticleReaderPageTemplate';
import { ArticleReaderPageTemplateService } from './article-reader-page-template.service';

@Controller('/template/article-reader')
export class ArticleReaderPageTemplateController {
  constructor(
    private readonly articleReaderPageTemplateService: ArticleReaderPageTemplateService,
  ) {}

  @Get(':news_id')
  async get(
    @Param('news_id') news_id: string,
  ): Promise<ArticleReaderPageTemplate> {
    return await this.articleReaderPageTemplateService.get(news_id);
  }
}
