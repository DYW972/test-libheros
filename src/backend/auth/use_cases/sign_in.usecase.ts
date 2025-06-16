import { Injectable } from '@nestjs/common';
import { CreateUser } from 'user/schemas/user.schema';
import { AuthResponse } from 'auth/schemas/auth-response';

import { TokenService } from 'auth/services/token/token.service';
import { RefreshTokenService } from 'auth/services/token/refresh_token.service';
import { SessionRepository } from 'auth/repositories/session.repository';
import { UserQueryService } from 'user/services/query/user-query.service';
import { PasswordService } from 'auth/services/password/password.service';
import { SaveSession } from 'auth/schemas/session.interface';
import { AuthException } from 'common/exceptions/auth.exception';
import { AuthMessages } from 'common/enums/auth-messages.enum';
import { User } from 'user/entities/user.entity';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly sessionRepository: SessionRepository,
    private readonly userQueryService: UserQueryService,
    protected readonly passwordService: PasswordService,
  ) {}
  async execute(
    ip: string,
    userAgent: string,
    credentials: Pick<CreateUser, 'email' | 'password'>,
  ): Promise<AuthResponse> {
    const user = await this.validateUser(
      credentials.email,
      credentials.password,
    );

    const accessToken = await this.tokenService.generateAccessToken(
      user.id,
      user.role?.name,
    );

    const {
      token: refreshToken,
      hashedToken,
      expiresAt,
    } = await this.refreshTokenService.generateRefreshToken();

    const session: SaveSession = {
      userId: user.id,
      hashedToken,
      role: user.role?.name,
      ip,
      userAgent,
      expiresAt,
    };

    await this.sessionRepository.saveSession(session);

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }

  protected async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userQueryService.findByEmail(email);
    if (
      !user ||
      !(await this.passwordService.compare(password, user.password))
    ) {
      throw new AuthException(AuthMessages.INVALID_CREDENTIALS);
    }
    return user;
  }
}
