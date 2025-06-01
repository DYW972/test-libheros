import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { UserService } from '../user/user.service';
import { UserDto } from './user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request?: Request): string | null => {
          const token: unknown = request.cookies.access_token;
          if (typeof token === 'string') {
            return token;
          }
          return null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    id: string;
    email: string;
    name?: string;
  }): Promise<UserDto> {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.email = user.email;
    userDto.name = user.name;

    return userDto;
  }
}
