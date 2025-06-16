import { Injectable } from '@nestjs/common';
import { UserQueryRepository } from 'user/repositories/query/user-query.repository';
import { User } from 'user/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(id: string): Promise<User> {
    return await this.userQueryRepository.findById(id);
  }
}
