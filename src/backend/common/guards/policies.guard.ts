import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '../decorators';
import { PolicyHandlerRegistry } from '../policies';
import { PolicyHandler } from '../interfaces';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(PolicyHandlerRegistry)
    private readonly registry: PolicyHandlerRegistry,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyNames = this.reflector.get<string[]>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    );

    if (!policyNames || policyNames.length === 0) return true;

    const request = context
      .switchToHttp()
      .getRequest<
        Request & { user: { id: string; email: string; role: string } }
      >();

    const user = request.user;

    for (const name of policyNames) {
      const handler: PolicyHandler = this.registry.get(name);
      const result = await handler.handle(user, context);

      if (!result) return false;
    }

    return true;
  }
}
