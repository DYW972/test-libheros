import { ExecutionContext } from '@nestjs/common';
import { PolicyHandler } from 'common/interfaces/policy-handler.interface';

export class AdminOnlyPolicy implements PolicyHandler {
  handle(
    user: { id: string; email: string; role: string },
    _context: ExecutionContext,
  ): boolean {
    return user.role === 'admin';
  }
}
