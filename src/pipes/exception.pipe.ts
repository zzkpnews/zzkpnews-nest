import { API_STATUS_CODE } from '@/constant/api-status-code';
import { APIResponse } from '@/interface/api/utils';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.header('Access-Control-Allow-Origin', '*');
    const response_json: APIResponse<null> = {
      code: API_STATUS_CODE.ResourceNotFound,
      timestamp: Date.now(),
      message: exception.message,
      content: null,
    };
    response.status(status).json(response_json);
  }
}
