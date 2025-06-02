import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  UnauthorizedException,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserDto } from './user.dto';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.register(registerDto);
    const registeredUser = {
      id: user.sub,
      name: user.name,
    };

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return registeredUser;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { id, email } = user;
    const { access_token } = await this.authService.login({ id, email });

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user: { id, email } };
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ message: 'Logged out' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request & { user: UserDto }): UserDto {
    return req.user;
  }
}
