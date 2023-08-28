import { API_STATUS_CODE } from '@/constant/api-status-code';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { APIException } from '../exception/api.exception';
import { JWTKey } from '@/constant/key';
import to from 'await-to-js';
import { CreatorAuthTokenPayload, SuperAuthTokenPayload } from '@/types/token-payload';

function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

@Injectable()
export class CreatorAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new APIException(API_STATUS_CODE.UserUnauthorized, 400);
    }
    const [errVerify, payload] = await to(
      this.jwtService.verifyAsync<CreatorAuthTokenPayload>(token, { secret: JWTKey }),
    );
    if (errVerify) {
      switch (errVerify.name) {
        case 'TokenExpiredError':
          throw new APIException(API_STATUS_CODE.UserAuthExpired, 400);
        default:
          throw new APIException(API_STATUS_CODE.UserAuthFailed, 400);
      }
    }
    if (payload.type !== 'creator') {
      throw new APIException(API_STATUS_CODE.UserPermissionDenied, 403);
    }
    request['payload'] = payload;
    return true;
  }
}

@Injectable()
export class SuperAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new APIException(API_STATUS_CODE.UserUnauthorized, 400);
    }
    const [errVerify, payload] = await to(
      this.jwtService.verifyAsync<SuperAuthTokenPayload>(token, { secret: JWTKey }),
    );
    if (errVerify) {
      switch (errVerify.name) {
        case 'TokenExpiredError':
          throw new APIException(API_STATUS_CODE.UserAuthExpired, 400);
        default:
          throw new APIException(API_STATUS_CODE.UserAuthFailed, 400);
      }
    }
    if (payload.type !== 'super') {
      throw new APIException(API_STATUS_CODE.UserPermissionDenied, 403);
    }
    request['payload'] = payload;
    return true;
  }
}
