import { HttpException, HttpStatus } from '@nestjs/common';
import { AppLogger } from 'common/services/logger.service';

interface ExceptionResponse {
  statusCode: number;
  error: string;
  message: string;
  errorCode: string;
  timestamp: string;
}

type ExceptionContext = {
  detail?: string;
  errorCode?: string;
  context?: string;
};

export class HttpExceptionFactory {
  private static logger: AppLogger;

  static configureLogger(logger: AppLogger) {
    this.logger = logger;
  }

  private static logError(response: ExceptionResponse, context: string) {
    this.logger?.error(context, `${response.errorCode} - ${response.message}`);
  }

  private static buildResponse({
    statusCode,
    error,
    message,
    errorCode,
  }: {
    statusCode: number;
    error: string;
    message: string;
    errorCode: string;
  }): ExceptionResponse {
    return {
      statusCode,
      error,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
    };
  }

  private static handleException({
    statusCode,
    error,
    message,
    errorCode,
    context = 'HttpExceptionFactory',
  }: {
    statusCode: number;
    error: string;
    message: string;
    errorCode: string;
    context?: string;
  }) {
    const response = this.buildResponse({
      statusCode,
      error,
      message,
      errorCode,
    });
    this.logError(response, context);
    return new HttpException(response, statusCode);
  }

  static NotFound(resourceName: string, context?: string) {
    return this.handleException({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: 'The requested resource was not found.',
      errorCode: `${resourceName.toUpperCase()}_NOT_FOUND`,
      context,
    });
  }

  static Forbidden(resourceName: string, context?: string) {
    return this.handleException({
      statusCode: HttpStatus.FORBIDDEN,
      error: 'Forbidden',
      message: 'You are not authorized to access this resource.',
      errorCode: `${resourceName.toUpperCase()}_FORBIDDEN`,
      context,
    });
  }

  static BadRequest({
    detail = 'The provided data is invalid.',
    errorCode = 'BAD_REQUEST',
    context = 'HttpExceptionFactory',
  }: ExceptionContext) {
    return this.handleException({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
      message: detail,
      errorCode,
      context,
    });
  }

  static Conflict(resourceName: string, context?: string) {
    return this.handleException({
      statusCode: HttpStatus.CONFLICT,
      error: 'Conflict',
      message: 'A conflict occurred with the resource.',
      errorCode: `${resourceName.toUpperCase()}_CONFLICT`,
      context,
    });
  }
}
