import { API_STATUS_CODE } from '@/constant/api-status-code';
import { APIResponse } from '@/interface/api/utils';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class APIInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map(
        (data): APIResponse<T> => ({
          code: API_STATUS_CODE.RequestOK,
          timestamp: Date.now(),
          content: data,
        }),
      ),
    );
  }
}
