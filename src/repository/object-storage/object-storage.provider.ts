import { Provider } from '@nestjs/common';
import { ObjectStorage } from './object-storage';

export const ObjectStorageProviders: Provider[] = [
  { provide: 'OBJECT-STORAGE', useClass: ObjectStorage },
];
