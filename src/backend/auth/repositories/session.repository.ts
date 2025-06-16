import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';
import { CreateSession } from 'auth/schemas/session.schema';
import { SessionOutput } from 'auth/schemas/session.schema';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async saveSession(createSession: CreateSession): Promise<SessionOutput> {
    const session = this.sessionRepository.create(createSession);
    return await this.sessionRepository.save(session);
  }

  async findValidSession(userId: string): Promise<Session | null> {
    return await this.sessionRepository.findOne({
      where: { user: { id: userId }, isRevoked: false },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async revokeSession(id: string): Promise<void> {
    await this.sessionRepository.update({ id }, { isRevoked: true });
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    await this.sessionRepository.update(
      { user: { id: userId } },
      { isRevoked: true },
    );
  }
}
