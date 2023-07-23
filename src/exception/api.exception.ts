import { HttpException } from '@nestjs/common/exceptions';

export class APIException extends HttpException {
  constructor(
    public readonly apiStatusCode: number,
    public readonly httpStatusCode: number,
    public readonly message: string = 'ERROR',
  ) {
    super(message, httpStatusCode);
  }
}
