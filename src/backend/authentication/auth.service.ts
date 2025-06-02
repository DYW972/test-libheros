import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, ConflictException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RegisterDto } from './register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = { name: newUser.name, sub: newUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'id' | 'email' | 'name'> | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return null;

    return { id: user.id, email: user.email, name: user.name };
  }

  async login(user: Pick<User, 'id' | 'email'>) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }
}
