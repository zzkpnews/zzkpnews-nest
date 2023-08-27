import { APIException } from '@/rc/exception/api.exception';
import { APIResponse } from '@/interface/utils';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(APIException)
export class APIExceptionFilter implements ExceptionFilter {
  catch(exception: APIException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.httpStatusCode;
    response.header('Access-Control-Allow-Origin', '*');
    const response_json: APIResponse<null> = {
      code: exception.apiStatusCode,
      timestamp: Date.now(),
      message: exception.message,
      content: null,
    };
    response.status(status).json(response_json);
  }
}
