import { ObjectStorageModule } from '@/repository/object-storage/object-storage.module';
import { Module } from '@nestjs/common';
import { GetSiteMetaAPIController } from './get-site-meta.controller';
import { GetSiteMetaAPIService } from './get-site-meta.service';

@Module({
  imports: [ObjectStorageModule],
  providers: [GetSiteMetaAPIService],
  controllers: [GetSiteMetaAPIController],
  exports: [GetSiteMetaAPIService],
})
export class GetSiteMetaAPIModule {}
