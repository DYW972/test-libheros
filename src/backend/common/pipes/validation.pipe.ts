import { Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';

@Injectable()
export class ValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const formatted: string = result.error.errors
        .map((issue) => issue.message)
        .join(' | ');

      throw HttpExceptionFactory.BadRequest({
        detail: formatted,
        context: 'VALIDATION_PIPE',
      });
    }

    return result.data;
  }
}
