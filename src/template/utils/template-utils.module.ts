import { EntityModule } from '@/model/entity/entities.module';
import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { Module } from '@nestjs/common';
import { TemplateUtilsService } from './template-utils.service';

@Module({
  imports: [ObjectStorageModule, EntityModule],
  providers: [TemplateUtilsService],
  exports: [TemplateUtilsService],
})
export class TemplateUtilsModule {}
