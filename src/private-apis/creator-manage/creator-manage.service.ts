import { DependenceFlags } from '@/constant/dep-flags';
import { CreatorChangePasswordAPIContent } from '@/interface/private-api/creator-manage';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CreatorManageAPIService {
  constructor(
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
  ) {}

  async updateProfile(
    creatorId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<CreatorChangePasswordAPIContent | null> {
    return null;
  }

  async changePassword(
    creatorId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<CreatorChangePasswordAPIContent | null> {
    return null;
  }

  async register(
    creatorId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<CreatorChangePasswordAPIContent | null> {
    return null;
  }

  async delete(
    creatorId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<CreatorChangePasswordAPIContent | null> {
    return null;
  }

  async block(
    creatorId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<CreatorChangePasswordAPIContent | null> {
    return null;
  }
}
