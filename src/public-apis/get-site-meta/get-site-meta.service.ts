import { DependenceFlags } from '@/constant/dep-flags';
import { GetSiteMetaAPIContent } from '@/interface/public-api/get-site-meta';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetSiteMetaAPIService {
  constructor(
    @Inject(DependenceFlags.ObjectStorage)
    private readonly objectStorage: ObjectStorage,
  ) {}
  async get(): Promise<GetSiteMetaAPIContent | null> {
    const siteMeta = this.objectStorage.get('site-meta');

    return {
      ...siteMeta,
    };
  }
}
