import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { id, email } = user;
    return this.authService.login({ id, email });
  }
}
