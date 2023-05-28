import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class TemplateModule {
  constructor() {}

  async getHomePage() {}

  async getArticleContentPage() {}

  async getVideoContentPage() {}

  async getSectionIndexPage() {}

  async getSectionContentPage() {}

  async getGroupIndexPage() {}

  async getGroupContentPage() {}

  async getCreatorProfilePage() {}
}
