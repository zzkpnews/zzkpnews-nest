import { API_STATUS_CODE } from '@/constant/api-status-code';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { APIException } from '../exception/api.exception';
import { JWTKey } from '@/constant/key';
import to from 'await-to-js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      console.log('no token');
      throw new APIException(API_STATUS_CODE.UserUnauthorized, 400);
    }
    const [errVerify] = await to(this.jwtService.verifyAsync(token, { secret: JWTKey }));
    console.log(errVerify.name);
    if (errVerify) {
      switch (errVerify.name) {
        case 'TokenExpiredError':
          throw new APIException(API_STATUS_CODE.UserAuthExpired, 400);
        default:
          throw new APIException(API_STATUS_CODE.UserAuthFailed, 400);
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
