import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from '../exceptions/app.exception';

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string | string[];
  errorCode: string;
  timestamp: string;
  path: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  private readonly isProduction = process.env.NODE_ENV === 'production';

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: ErrorResponse = {
      statusCode: status,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred.',
      errorCode: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (exception instanceof AppException) {
      status = exception.getStatus();
      const { message, errorCode } = exception.getResponse() as {
        message: string;
        errorCode: string;
      };

      responseBody = {
        statusCode: status,
        error: 'Application Error',
        message,
        errorCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const { message } = exceptionResponse as { message: string | string[] };

        responseBody = {
          statusCode: status,
          error: exception.name,
          message,
          errorCode: 'HTTP_ERROR',
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      } else {
        responseBody = {
          ...responseBody,
          statusCode: status,
          message: exceptionResponse as string,
          error: exception.name,
          errorCode: 'HTTP_ERROR',
        };
      }
    }

    this.logger.error({
      path: request.url,
      method: request.method,
      statusCode: status,
      exception: this.isProduction
        ? 'Stack trace hidden in production'
        : exception instanceof Error
          ? exception.stack
          : exception,
    });

    response.status(status).json(responseBody);
  }
}
