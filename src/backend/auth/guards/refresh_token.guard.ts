import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { RefreshTokenService } from '../services/token/refresh_token.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<
        Request & { user: { id: string; email: string; role: string } }
      >();
    const refreshToken = request.cookies?.refresh_token as string;
    const userId = request.cookies.user_id as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const session = await this.refreshTokenService.validateRefreshToken(
      userId,
      refreshToken,
    );

    if (!session) {
      console.error('Invalid or expired refresh token');
      throw new UnauthorizedException('Unauthorized');
    }

    request.user = session.user;

    return true;
  }
}
