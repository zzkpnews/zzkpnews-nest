import { ArticleReaderPageTemplate } from '@/interface/template/ArticleReaderPageTemplate';
import { ArticleReaderPageTemplateService } from './article-reader-page/article-reader-page-template.service';
import { BookIndexPageTemplate } from '@/interface/template/BookIndexPageTemplate';
import { BookIndexPageTemplateService } from './book-index-page/book-index-page-template.service';
import { BookReaderPageTemplate } from '@/interface/template/BookReaderPageTemplate';
import { BookReaderPageTemplateService } from './book-reader-page/book-reader-page-template.service';
import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { CreatorProfilePageTemplate } from '@/interface/template/CreatorProfilePageTemplate';
import { CreatorProfilePageTemplateService } from './creator-profile-page/creator-profile-page-template.service';
import { Error403PageTemplate } from '@/interface/template/Error403PageTemplate';
import { Error403PageTemplateService } from './error-403-page/error-403-page-template.service';
import { Error404PageTemplate } from '@/interface/template/Error404PageTemplate';
import { Error404PageTemplateService } from './error-404-page/error-404-page-template.service';
import { Error500PageTemplate } from '@/interface/template/Error500PageTemplate';
import { Error500PageTemplateService } from './error-500-page/error-500-page-template.service';
import { GroupContentPageTemplate } from '@/interface/template/GroupContentPageTemplate';
import { GroupContentPageTemplateService } from './group-content-page/group-content-page-template.service';
import { GroupIndexPageTemplate } from '@/interface/template/GroupIndexPageTemplate';
import { GroupIndexPageTemplateService } from './group-index-page/group-index-page.service';
import { HomePageTemplate } from '@/interface/template/HomePageTemplate';
import { HomePageTemplateService } from './home-page/home-page-template.service';
import { SearchPageTemplate } from '@/interface/template/SearchPageTemplate';
import { SearchPageTemplateService } from './search-page/search-page-template.service';
import { SectionContentPageTemplate } from '@/interface/template/SectionContentPageTemplate';
import { SectionContentPageTemplateService } from './section-content-page/section-content-page-template.service';
import { SectionIndexPageTemplate } from '@/interface/template/SectionIndexPageTemplate';
import { SectionIndexPageTemplateService } from './section-index-page/section-index-page.service';
import { TopicContentPageTemplate } from '@/interface/template/TopicContentPageTemplate';
import { TopicContentPageTemplateService } from './topic-content-page/topic-content-page-template.service';
import { TopicIndexPageTemplate } from '@/interface/template/TopicIndexPageTemplate';
import { TopicIndexPageTemplateService } from './topic-index-page/topic-index-page.service';
import { VideoReaderPageTemplate } from '@/interface/template/VideoReaderPageTemplate';
import { VideoReaderPageTemplateService } from './video-reader-page/video-reader-page-template.service';
import { HttpExceptionFilter } from '@/pipes/exception.pipe';

// @UseFilters(HttpExceptionFilter)
@Controller('templates')
export class TemplatesController {
  constructor(
    private readonly articleReaderPageTemplateService: ArticleReaderPageTemplateService,
    private readonly bookIndexPageTemplateService: BookIndexPageTemplateService,
    private readonly bookReaderPageTemplateService: BookReaderPageTemplateService,
    private readonly creatorProfilePageTemplateService: CreatorProfilePageTemplateService,
    private readonly groupContentPageTemplateService: GroupContentPageTemplateService,
    private readonly groupIndexPageTemplateService: GroupIndexPageTemplateService,
    private readonly homePageTemplateService: HomePageTemplateService,
    private readonly searchPageTemplateService: SearchPageTemplateService,
    private readonly sectionContentPageTemplateService: SectionContentPageTemplateService,
    private readonly sectionIndexPageTemplateService: SectionIndexPageTemplateService,
    private readonly topicContentPageTemplateService: TopicContentPageTemplateService,
    private readonly topicIndexPageTemplateService: TopicIndexPageTemplateService,
    private readonly videoReaderPageTemplateService: VideoReaderPageTemplateService,
    private readonly error403PageTemplateService: Error403PageTemplateService,
    private readonly error404PageTemplateService: Error404PageTemplateService,
    private readonly error500PageTemplateService: Error500PageTemplateService,
  ) {}

  @Get('/article-reader/:news_id')
  async getArticleReaderPage(
    @Param('news_id') news_id: string,
  ): Promise<ArticleReaderPageTemplate> {
    return await this.articleReaderPageTemplateService.get(news_id);
  }

  @Get('/book-index')
  async getBookIndexPage(): Promise<BookIndexPageTemplate> {
    return await this.bookIndexPageTemplateService.get();
  }

  @Get('/book-reader/:book_id')
  async getBookReaderPage(
    @Param('book_id') book_id: string,
  ): Promise<BookReaderPageTemplate> {
    return await this.bookReaderPageTemplateService.get(book_id);
  }

  @Get('/creator-profile/:creator_id')
  async getCreatorProfilePage(
    @Param('creator_id') creator_id: string,
  ): Promise<CreatorProfilePageTemplate> {
    return await this.creatorProfilePageTemplateService.get(creator_id);
  }

  @Get('/group-content/:group_id')
  async getGroupContentPage(
    @Param('group_id') group_id: string,
  ): Promise<GroupContentPageTemplate> {
    return await this.groupContentPageTemplateService.get(group_id);
  }

  @Get('/group-index')
  async getGroupIndexPage(): Promise<GroupIndexPageTemplate> {
    return await this.groupIndexPageTemplateService.get();
  }

  @Get('/home')
  async getHomePage(): Promise<HomePageTemplate> {
    return await this.homePageTemplateService.get();
  }

  @Get('/search')
  async getSearchPage(): Promise<SearchPageTemplate> {
    return await this.searchPageTemplateService.get();
  }

  @Get('/section-content/:section_id')
  async getSectionContentPage(
    @Param('section_id') section_id: string,
  ): Promise<SectionContentPageTemplate> {
    return await this.sectionContentPageTemplateService.get(section_id);
  }

  @Get('/section-index')
  async getSectionIndexPage(): Promise<SectionIndexPageTemplate> {
    return await this.sectionIndexPageTemplateService.get();
  }

  @Get('/topic-content/:topic_id')
  async getTopicContentPage(
    @Param('topic_id') topic_id: string,
  ): Promise<TopicContentPageTemplate> {
    return await this.topicContentPageTemplateService.get(topic_id);
  }

  @Get('/topic-index')
  async getTopicIndexPage(): Promise<TopicIndexPageTemplate> {
    return await this.topicIndexPageTemplateService.get();
  }

  @Get('/video-reader/:news_id')
  async getVideoReaderPage(
    @Param('news_id') news_id: string,
  ): Promise<VideoReaderPageTemplate> {
    return await this.videoReaderPageTemplateService.get(news_id);
  }

  @Get('error-403')
  async getError403Page(): Promise<Error403PageTemplate> {
    return await this.error403PageTemplateService.get();
  }

  @Get('error-404')
  async getError404Page(): Promise<Error404PageTemplate> {
    return await this.error404PageTemplateService.get();
  }

  @Get('error-500')
  async getError500Page(): Promise<Error500PageTemplate> {
    return await this.error500PageTemplateService.get();
  }
}
