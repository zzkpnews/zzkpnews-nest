import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { GetCreatorAPI } from '@/interface/api/get-creator';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { APIException } from '@/rc/exception/api.exception';
import { Inject, Injectable } from '@nestjs/common';
import to from 'await-to-js';

@Injectable()
export class GetCreatorAPIService {
  constructor(
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
  ) {}
  async get(creatorId: string): Promise<GetCreatorAPI | null> {
    const [errCreator, creator] = await to(this.creatorRepository.findById(creatorId));
    if (errCreator) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    if (creator == null) throw new APIException(API_STATUS_CODE.ResourceNotFound, 404);

    return {
      id: creator.id,
      title: creator.title,
      phone: creator.phone,
      email: creator.email,
      description: creator.email,
      address: creator.address,
      qq: creator.qq,
      wechat: creator.wechat,
      weibo: creator.weibo,
      url: creator.url,
      logo: creator.logo,
      coverImage: creator.coverImage,
    };
  }
}
