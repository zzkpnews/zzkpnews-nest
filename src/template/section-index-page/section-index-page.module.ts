import { Module } from '@nestjs/common';
import { SectionIndexPageTemplateService } from './section-index-page.service';
import { SectionIndexPageTemplateController } from './section-index-page.controller';

@Module({
  controllers: [SectionIndexPageTemplateController],
  providers: [SectionIndexPageTemplateService],
})
export class SectionIndexPageTemplateModule {}
