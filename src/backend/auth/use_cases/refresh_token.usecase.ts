import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshedTokens } from 'auth/schemas/tokens.interface';
import { AuthMessages } from 'common/enums/auth-messages.enum';
import { RefreshTokenService } from 'auth/services/token/refresh_token.service';
import { TokenService } from 'auth/services/token/token.service';
import { SessionRepository } from 'auth/repositories/session.repository';
import { SaveSession } from 'auth/schemas/session.interface';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: SessionRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly tokenService: TokenService,
  ) {}
  async execute(
    ip: string,
    userAgent: string,
    userId: string,
    refreshToken: string,
  ): Promise<RefreshedTokens> {
    const tokenRecord =
      await this.refreshTokenRepository.findValidSession(userId);

    if (!tokenRecord) {
      throw new UnauthorizedException(AuthMessages.INVALID_REFRESH_TOKEN);
    }

    const isValid = await this.refreshTokenService.compareRefreshTokens(
      refreshToken,
      tokenRecord.hashedToken,
    );
    if (!isValid) {
      throw new UnauthorizedException(AuthMessages.INVALID_REFRESH_TOKEN);
    }

    await this.refreshTokenRepository.revokeSession(tokenRecord.id);

    const accessToken = await this.tokenService.generateAccessToken(
      userId,
      tokenRecord.user.role?.name,
    );

    const {
      token: newRefreshToken,
      hashedToken,
      expiresAt,
    } = await this.refreshTokenService.generateRefreshToken();

    const session: SaveSession = {
      userId: tokenRecord.user.id,
      hashedToken,
      role: tokenRecord.user.role?.name,
      ip,
      userAgent,
      expiresAt,
    };

    await this.refreshTokenRepository.saveSession(session);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
