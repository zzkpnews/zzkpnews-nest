import { Controller, Get } from '@nestjs/common';
import { HomePageTemplateService } from './home-page-template.service';
import { HomePageTemplate } from '@/interface/template/HomePageTemplate';

@Controller('/template/home')
export class HomePageTemplateController {
  constructor(
    private readonly homePageTemplateService: HomePageTemplateService,
  ) {}

  @Get()
  async get(): Promise<HomePageTemplate> {
    return await this.homePageTemplateService.get();
  }
}
