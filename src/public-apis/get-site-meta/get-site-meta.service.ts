import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { GetSiteMetaAPI } from '@/interface/api/get-site-meta';
import { GetVideoAPI } from '@/interface/api/get-video';
import { VideoRepository } from '@/model/entity/video/video.repository';
import { SiteMeta } from '@/model/object/site-meta/site-meta.object';
import { APIException } from '@/rc/exception/api.exception';
import { ObjectStorage } from '@/repository/object-storage/object-storage';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';

@Injectable()
export class GetSiteMetaAPIService {
  constructor(
    @Inject(DependenceFlags.ObjectStorage)
    private readonly objectStorage: ObjectStorage,
  ) {}
  async get(): Promise<GetSiteMetaAPI | null> {
    const siteMeta = this.objectStorage.get('site-meta');

    return {
      ...siteMeta,
    };
  }
}
