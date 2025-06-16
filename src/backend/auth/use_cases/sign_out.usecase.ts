import { Injectable } from '@nestjs/common';
import { SessionRepository } from 'auth/repositories/session.repository';

@Injectable()
export class SignOutUseCase {
  constructor(private readonly refreshTokenRepository: SessionRepository) {}
  async execute(userId: string): Promise<void> {
    return await this.refreshTokenRepository.revokeAllUserSessions(userId);
  }
}
