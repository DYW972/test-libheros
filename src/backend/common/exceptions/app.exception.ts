import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  readonly errorCode: string;

  constructor(
    message: string,
    errorCode: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ statusCode: status, message, errorCode }, status);
    this.errorCode = errorCode;
  }
}
