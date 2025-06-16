import { Injectable } from '@nestjs/common';

import { CreateUser, UserOutput } from '../schemas/user.schema';
import { PasswordService } from 'auth/services/password/password.service';
import { RoleDomainService } from 'role/services/role-domain.service';
import { UserCommandRepository } from 'user/repositories/command/user-command.repository';
import { UserQueryRepository } from 'user/repositories/query/user-query.repository';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly userQueryRepository: UserQueryRepository,
    private readonly roleDomainService: RoleDomainService,
    private readonly passwordService: PasswordService,
  ) {}
  async execute(data: CreateUser): Promise<UserOutput> {
    const { email, password } = data;

    await this.ensureEmailNotExists(email);
    const role = await this.roleDomainService.getOrCreateDefaultRole();
    data.role = role;
    const hashedPassword = await this.passwordService.hash(password);

    return await this.userCommandRepository.saveUser(data, hashedPassword);
  }

  private async ensureEmailNotExists(email: string): Promise<void> {
    const existingUser = await this.userQueryRepository.findByEmail(email);
    if (existingUser) {
      throw HttpExceptionFactory.Conflict(`User`, 'CreateUserUseCase');
    }
  }
}
