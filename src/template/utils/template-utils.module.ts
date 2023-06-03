import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { TemplateUtilsService } from './template-utils.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ObjectStorageModule],
  providers: [TemplateUtilsService],
})
export class TemplateUtilsModule {}
