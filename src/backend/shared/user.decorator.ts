import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export const User = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;
    return data ? user?.[data] : user;
  },
);
