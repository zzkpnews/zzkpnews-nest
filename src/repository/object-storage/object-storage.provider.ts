import { Provider } from '@nestjs/common';
import { ObjectStorage } from './object-storage';
import { DependenceFlags } from '@/constant/dep-flags';

export const ObjectStorageProviders: Provider[] = [
  { provide: DependenceFlags.ObjectStorage, useClass: ObjectStorage },
];
