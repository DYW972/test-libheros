import { ExecutionContext } from '@nestjs/common';

export interface PolicyHandler {
  handle(
    user: { id: string; email: string; role: string },
    context: ExecutionContext,
  ): boolean | Promise<boolean>;
}
