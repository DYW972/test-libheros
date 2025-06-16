import { Injectable } from '@nestjs/common';
import { UserQueryRepository } from 'user/repositories/query/user-query.repository';
import { User } from 'user/entities/user.entity';

@Injectable()
export class FindUsersUseCase {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}
  async execute(): Promise<User[]> {
    return await this.userQueryRepository.findAll();
  }
}
