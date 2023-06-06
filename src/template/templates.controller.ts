import { ArticleReaderPageTemplate } from '@/interface/template/ArticleReaderPageTemplate';
import { BookIndexPageTemplate } from '@/interface/template/BookIndexPageTemplate';
import { BookReaderPageTemplate } from '@/interface/template/BookReaderPageTemplate';
import { CreatorProfilePageTemplate } from '@/interface/template/CreatorProfilePageTemplate';
import { GroupContentPageTemplate } from '@/interface/template/GroupContentPageTemplate';
import { GroupIndexPageTemplate } from '@/interface/template/GroupIndexPageTemplate';
import { HomePageTemplate } from '@/interface/template/HomePageTemplate';
import { SearchPageTemplate } from '@/interface/template/SearchPageTemplate';
import { SectionContentPageTemplate } from '@/interface/template/SectionContentPageTemplate';
import { SectionIndexPageTemplate } from '@/interface/template/SectionIndexPageTemplate';
import { Controller, Get, Param } from '@nestjs/common';
import { ArticleReaderPageTemplateService } from './article-reader-page/article-reader-page-template.service';
import { BookIndexPageTemplateService } from './book-index-page/book-index-page-template.service';
import { BookReaderPageTemplateService } from './book-reader-page/book-reader-page-template.service';
import { CreatorProfilePageTemplateService } from './creator-profile-page/creator-profile-page-template.service';
import { GroupContentPageTemplateService } from './group-content-page/group-content-page-template.service';
import { GroupIndexPageTemplateService } from './group-index-page/group-index-page.service';
import { HomePageTemplateService } from './home-page/home-page-template.service';
import { SearchPageTemplateService } from './search-page/search-page-template.service';
import { SectionContentPageTemplateService } from './section-content-page/section-content-page-template.service';
import { SectionIndexPageTemplateService } from './section-index-page/section-index-page.service';
import { TopicContentPageTemplateService } from './topic-content-page/topic-content-page-template.service';
import { TopicContentPageTemplate } from '@/interface/template/TopicContentPageTemplate';
import { TopicIndexPageTemplateService } from './topic-index-page/topic-index-page.service';
import { TopicIndexPageTemplate } from '@/interface/template/TopicIndexPageTemplate';
import { VideoReaderPageTemplateService } from './video-reader-page/video-reader-page-template.service';
import { VideoReaderPageTemplate } from '@/interface/template/VideoReaderPageTemplate';

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
  ) {}

  @Get('/article-reader/:news_id')
  async getArticleReaderPage(
    @Param('news_id') news_id: string,
  ): Promise<ArticleReaderPageTemplate> {
    return await this.articleReaderPageTemplateService.get(news_id);
  }

  @Get()
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
}
