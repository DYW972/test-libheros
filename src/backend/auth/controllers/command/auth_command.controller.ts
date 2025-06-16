import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { Cookies } from 'common/decorators/cookies.decorator';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';
import { RefreshTokenGuard } from 'auth/guards/refresh_token.guard';
import { AuthCookieService } from 'auth/services/cookie/auth-cookie.service';
import { AuthService } from 'auth/services/auth.service';
import { CreateUser } from 'user/schemas/user.schema';
import { AuthMessages } from 'common/enums/auth-messages.enum';
import { RequestContext } from 'common/utils/request-context.util';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Controller('auth')
export class AuthCommandController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookieService: AuthCookieService,
    private readonly requestContext: RequestContext,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() body: CreateUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ id: string; email: string }> {
    const { ip, userAgent } = this.requestContext.getClientContext();
    const { accessToken, refreshToken, userId } = await this.authService.signUp(
      ip,
      userAgent,
      body,
    );

    this.authCookieService.setAuthCookies(
      response,
      accessToken,
      refreshToken,
      userId,
    );
    return {
      id: userId,
      email: body.email,
    };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() credentials: Pick<CreateUser, 'email' | 'password'>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { ip, userAgent } = this.requestContext.getClientContext();
    const { accessToken, refreshToken, userId } = await this.authService.signIn(
      ip,
      userAgent,
      credentials,
    );

    this.authCookieService.setAuthCookies(
      response,
      accessToken,
      refreshToken,
      userId,
    );

    return {
      id: userId,
      email: credentials.email,
    };
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @CurrentUser() user: { id: string; email: string; role: string },
    @Cookies('refresh_token') refreshToken: string,
    @Res({ passthrough: true })
    response: Response,
  ): Promise<string> {
    const { ip, userAgent } = this.requestContext.getClientContext();
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(ip, userAgent, user.id, refreshToken);

    this.authCookieService.setAuthCookies(
      response,
      accessToken,
      newRefreshToken,
      user.id,
    );

    return AuthMessages.REFRESH_SUCCESS;
  }

  @UseGuards(AccessTokenGuard)
  @Post('signout')
  async signOut(
    @CurrentUser() user: { id: string; email: string; role: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    await this.authService.signOut(user.id);
    this.authCookieService.clearAuthCookies(response);
    return AuthMessages.SIGNOUT_SUCCESS;
  }
}
