import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'common/interfaces/request-user.interface';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: keyof RequestUser | undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as RequestUser;
    return data ? user?.[data] : user;
  },
);
