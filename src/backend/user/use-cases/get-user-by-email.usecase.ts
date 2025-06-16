import { Injectable } from '@nestjs/common';
import { UserQueryRepository } from 'user/repositories/query/user-query.repository';
import { User } from 'user/entities/user.entity';

@Injectable()
export class GetUserByEmail {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(email: string): Promise<User> {
    return await this.userQueryRepository.findByEmail(email);
  }
}
