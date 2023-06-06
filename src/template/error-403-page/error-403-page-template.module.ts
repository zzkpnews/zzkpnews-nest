import { Error403PageTemplateController } from './error-403-page-template.controller';
import { Error403PageTemplateService } from './error-403-page-template.service';
import { EntityModule } from '@/model/entity/entities.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsModule } from '../utils/template-utils.module';
import { ViewsModule } from '@/model/view/views.module';

@Module({
  imports: [EntityModule, ViewsModule, TemplateUtilsModule],
  controllers: [Error403PageTemplateController],
  providers: [Error403PageTemplateService],
  exports: [Error403PageTemplateService],
})
export class Error403PageTemplateModule {}
