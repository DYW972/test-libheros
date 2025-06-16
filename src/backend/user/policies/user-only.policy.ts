import { ExecutionContext } from '@nestjs/common';
import { PolicyHandler } from 'common';

export class UserOnlyPolicy implements PolicyHandler {
  handle(
    user: { id: string; email: string; role: string },
    _context: ExecutionContext,
  ): boolean | Promise<boolean> {
    return user.role === 'user';
  }
}
