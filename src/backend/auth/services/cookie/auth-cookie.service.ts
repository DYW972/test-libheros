import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthCookieService {
  private readonly DEFAULT_ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes for access_token
  private readonly DEFAULT_REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days for refresh_token
  private readonly DEFAULT_USER_ID_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days for user_id
  private readonly REFRESH_TOKEN_PATH = '/auth/refresh';

  setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
    userId: string,
  ) {
    response.cookie(
      'access_token',
      accessToken,
      this.buildSecureCookieOptions(this.DEFAULT_ACCESS_TOKEN_MAX_AGE),
    );
    response.cookie(
      'refresh_token',
      refreshToken,
      this.buildSecureCookieOptions(
        this.DEFAULT_REFRESH_TOKEN_MAX_AGE,
        this.REFRESH_TOKEN_PATH,
      ),
    );
    response.cookie(
      'user_id',
      userId,
      this.buildSecureCookieOptions(this.DEFAULT_USER_ID_MAX_AGE),
    );
  }

  clearAuthCookies(response: Response) {
    response.clearCookie('access_token', { path: '/' });
    response.clearCookie('refresh_token', { path: this.REFRESH_TOKEN_PATH });
    response.clearCookie('user_id', { path: '/' });
  }

  private buildSecureCookieOptions(
    maxAge: number,
    path = '/',
  ): Record<string, any> {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path,
      maxAge,
    };
  }
}
