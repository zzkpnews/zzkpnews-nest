import { API_STATUS_CODE } from '@/constant/api-status-code';
import { DependenceFlags } from '@/constant/dep-flags';
import { JWTExpired } from '@/constant/key';
import { UserLoginAuthAPIContent, UserRefreshTokenAPIContent } from '@/interface/private-api/user-auth';
import { verifyPasswordHash } from '@/libs/password';
import { CreatorRepository } from '@/model/entity/creator/creator.repository';
import { APIException } from '@/rc/exception/api.exception';
import { CreatorAuthTokenPayload, SuperAuthTokenPayload } from '@/types/token-payload';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import to from 'await-to-js';
import { CreatorLoginAuthDTO, SuperLoginAuthDTO } from './user-auth.dto';

@Injectable()
export class UserAuthAPIService {
  constructor(
    @Inject(DependenceFlags.CreatorRepository)
    private readonly creatorRepository: CreatorRepository,
    private readonly jwtService: JwtService,
  ) {}
  async creatorLogin(input: CreatorLoginAuthDTO): Promise<UserLoginAuthAPIContent | null> {
    const [errCreator, creator] = await to(this.creatorRepository.findById(input.creatorId));
    if (errCreator) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (creator == null) {
      throw new APIException(API_STATUS_CODE.UserNotFound, 404);
    }
    if (creator.closed) {
      throw new APIException(API_STATUS_CODE.UserBlocked, 403);
    }
    if (!verifyPasswordHash(input.password, creator.salt, creator.passwordHash)) {
      throw new APIException(API_STATUS_CODE.UserAuthFailed, 403);
    }
    const tokenPayload: CreatorAuthTokenPayload = { role: 'creator', id: creator.id };
    const [errToken, token] = await to(this.jwtService.signAsync(tokenPayload));
    if (errToken) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    return {
      token: token,
      expiredAt: JWTExpired * 1000 + Date.now(),
    };
  }

  async creatorRefreshToken(authTokenPayload: CreatorAuthTokenPayload): Promise<UserRefreshTokenAPIContent | null> {
    const creatorId = authTokenPayload.id;
    const [errCreator, creator] = await to(this.creatorRepository.findById(creatorId));
    if (errCreator) {
      throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    }
    if (creator == null) {
      throw new APIException(API_STATUS_CODE.UserNotFound, 404);
    }
    if (creator.closed) {
      throw new APIException(API_STATUS_CODE.UserBlocked, 403);
    }
    const newAuthTokenPayload: CreatorAuthTokenPayload = { role: 'creator', id: creator.id };
    const [errToken, token] = await to(this.jwtService.signAsync(newAuthTokenPayload));
    if (errToken) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    return {
      token: token,
      expiredAt: JWTExpired * 1000 + Date.now(),
    };
  }

  async superLogin(input: SuperLoginAuthDTO): Promise<UserLoginAuthAPIContent | null> {
    const tokenPayload: SuperAuthTokenPayload = { role: 'super' };
    const [errToken, token] = await to(this.jwtService.signAsync(tokenPayload));
    if (errToken) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    return {
      token: token,
      expiredAt: JWTExpired * 1000 + Date.now(),
    };
  }

  async superRefreshToken(): Promise<UserRefreshTokenAPIContent | null> {
    const tokenPayload: SuperAuthTokenPayload = { role: 'super' };
    const [errToken, token] = await to(this.jwtService.signAsync(tokenPayload));
    if (errToken) throw new APIException(API_STATUS_CODE.ServerInternalError, 500);
    return {
      token: token,
      expiredAt: JWTExpired * 1000 + Date.now(),
    };
  }
}
