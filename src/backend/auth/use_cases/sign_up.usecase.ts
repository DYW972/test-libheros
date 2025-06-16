import { Injectable } from '@nestjs/common';
import { AuthResponse } from 'auth/schemas/auth-response';

import { CreateUser } from 'user/schemas/user.schema';
import { UserCommandService } from 'user/services/command/user-command.service';
import { TokenService } from 'auth/services/token/token.service';
import { RefreshTokenService } from 'auth/services/token/refresh_token.service';
import { SessionRepository } from 'auth/repositories/session.repository';
import { CreateSession } from 'auth/schemas/session.schema';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly userCommandService: UserCommandService,
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly refreshTokenRepository: SessionRepository,
  ) {}
  async execute(
    ip: string,
    userAgent: string,
    userData: CreateUser,
  ): Promise<AuthResponse> {
    const user = await this.userCommandService.create(userData);

    const accessToken = await this.tokenService.generateAccessToken(
      user.id,
      user.role.name,
    );

    const {
      token: refreshToken,
      hashedToken,
      expiresAt,
    } = await this.refreshTokenService.generateRefreshToken();

    const session: CreateSession = {
      userId: user.id,
      hashedToken,
      ip,
      userAgent,
      expiresAt,
    };

    await this.refreshTokenRepository.saveSession(session);

    return {
      accessToken,
      refreshToken,
      userId: user.id,
      role: user.role.name,
    };
  }
}
