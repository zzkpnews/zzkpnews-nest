import { Module } from '@nestjs/common';
import { ObjectStorageProviders } from './object-storage.provider';
@Module({
  providers: ObjectStorageProviders,
  exports: ObjectStorageProviders,
})
export class ObjectStorageModule {}
