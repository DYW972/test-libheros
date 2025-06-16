import { Injectable } from '@nestjs/common';
import { UpdateUser, UserOutput } from 'user/schemas/user.schema';
import { UserCommandRepository } from 'user/repositories/command/user-command.repository';
import { UserQueryRepository } from 'user/repositories/query/user-query.repository';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(id: string, values: UpdateUser): Promise<UserOutput> {
    const existingUser = await this.userQueryRepository.findById(id);
    if (!existingUser) {
      throw HttpExceptionFactory.NotFound(`User`, 'UpdateUserUseCase');
    }

    const update = Object.assign(existingUser, {
      ...(values.name !== undefined && { name: values.name }),
      ...(values.email !== undefined && { email: values.email }),
      ...(values.password !== undefined && { password: values.password }),
    });
    const user = await this.userCommandRepository.updateUser(id, update);
    return user as UserOutput;
  }
}
