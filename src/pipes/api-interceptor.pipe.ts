import { API_STATUS_CODE } from '@/constant/api-status-code';
import { APIResponse } from '@/interface/api/utils';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class APIInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const response_json: APIResponse<T> = {
          code: API_STATUS_CODE.RequestOK,
          timestamp: Date.now(),
          content: data,
        };
        return response.status(200).json(response_json);
      }),
    );
  }
}
