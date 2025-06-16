import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from 'common/interfaces/request-user.interface';

export const User = createParamDecorator(
  (data: keyof RequestUser | undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as RequestUser;
    return data ? user?.[data] : user;
  },
);
