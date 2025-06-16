import { Injectable } from '@nestjs/common';
import { User } from 'user/entities/user.entity';

import { GetUserByEmail } from 'user/use-cases/get-user-by-email.usecase';
import { GetUserByIdUseCase } from 'user/use-cases/get-user-by-id.usecase';

@Injectable()
export class UserQueryService {
  constructor(
    private readonly getUserById: GetUserByIdUseCase,
    private readonly getUserByEmail: GetUserByEmail,
  ) {}

  async findOneById(id: string): Promise<User> {
    return await this.getUserById.execute(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.getUserByEmail.execute(email);
  }
}
