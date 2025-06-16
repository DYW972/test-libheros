import { Injectable } from '@nestjs/common';
import { UserQueryService } from 'user/services/query/user-query.service';
import { SessionRepository } from '../../repositories/session.repository';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: SessionRepository,
    private readonly userService: UserQueryService,
  ) {}

  async generateRefreshToken(): Promise<{
    token: string;
    hashedToken: string;
    expiresAt: Date;
  }> {
    const token = crypto.randomBytes(64).toString('hex');
    const hashedToken = await bcrypt.hash(token, 12);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // valid 7 days
    return { token, hashedToken, expiresAt };
  }

  async compareRefreshTokens(
    rawToken: string,
    hashedToken: string,
  ): Promise<boolean> {
    return bcrypt.compare(rawToken, hashedToken);
  }

  // Used by RefreshTokenGuard
  async validateRefreshToken(
    userId: string,
    rawToken: string,
  ): Promise<{ user: { id: string; email: string; role: string } }> {
    const session = await this.refreshTokenRepository.findValidSession(userId);
    if (!session) return null;
    console.log(session);
    const isMatch = await bcrypt.compare(rawToken, session.hashedToken);
    console.log(isMatch);
    if (!isMatch) return null;

    const user = await this.userService.findOneById(session.userId);
    if (!user) return null;

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role?.name,
      },
    };
  }
}
