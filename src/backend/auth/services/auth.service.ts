import { Injectable } from '@nestjs/common';
import { CreateUser } from 'user/schemas/user.schema';
import { AuthResponse } from 'auth/schemas/auth-response';
import { SignInUseCase } from 'auth/use_cases/sign_in.usecase';
import { SignUpUseCase } from 'auth/use_cases/sign_up.usecase';
import { SignOutUseCase } from 'auth/use_cases/sign_out.usecase';
import { RefreshTokenUseCase } from 'auth/use_cases/refresh_token.usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async signIn(
    ip: string,
    userAgent: string,
    credentials: Pick<CreateUser, 'email' | 'password'>,
  ): Promise<AuthResponse> {
    return await this.signInUseCase.execute(ip, userAgent, credentials);
  }

  async signUp(
    ip: string,
    userAgent: string,
    data: CreateUser,
  ): Promise<AuthResponse> {
    return await this.signUpUseCase.execute(ip, userAgent, data);
  }

  async refreshToken(
    ip: string,
    userAgent: string,
    userId: string,
    refreshToken: string,
  ): Promise<AuthResponse> {
    return await this.refreshTokenUseCase.execute(
      ip,
      userAgent,
      userId,
      refreshToken,
    );
  }

  async signOut(userId: string): Promise<void> {
    return await this.signOutUseCase.execute(userId);
  }
}
