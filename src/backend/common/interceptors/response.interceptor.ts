import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T | null;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T = unknown>
  implements NestInterceptor<unknown, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((result) => {
        const now = new Date().toISOString();

        const isApiResponse = (value: unknown): value is ApiResponse<T> => {
          return (
            value &&
            typeof value === 'object' &&
            'statusCode' in value &&
            typeof value.statusCode === 'number' &&
            'message' in value &&
            typeof value.message === 'string' &&
            'data' in value
          );
        };

        if (isApiResponse(result)) {
          return {
            ...result,
            timestamp: now,
            data: this.cleanData(result.data) as T | null,
          };
        }

        if (
          result &&
          typeof result === 'object' &&
          'message' in result &&
          typeof result.message === 'string' &&
          Object.keys(result).length === 1
        ) {
          return {
            statusCode: 200,
            message: (result as { message: string }).message,
            timestamp: now,
            data: null,
          };
        }

        return {
          statusCode: 200,
          message: 'Request successful',
          timestamp: now,
          data: this.cleanData(result) as T | null,
        };
      }),
    );
  }

  private cleanData(data: unknown): unknown {
    if (data && typeof data === 'object' && 'message' in data) {
      const { ['message']: _, ...rest } = data as Record<string, unknown>;
      return Object.keys(rest).length > 0 ? rest : null;
    }
    return data;
  }
}
