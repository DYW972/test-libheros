import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayload } from 'common';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(id: string, role: string): Promise<string> {
    const payload = this.formatAccesTokenPayload(id, role);
    return await this.jwtService.signAsync(payload, { expiresIn: '15m' });
  }

  private formatAccesTokenPayload(
    id: string,
    role: string,
  ): JwtTokenPayload | undefined {
    return {
      sub: id,
      role,
      iat: Math.floor(Date.now() / 1000), // expire in 1h
    };
  }
}
