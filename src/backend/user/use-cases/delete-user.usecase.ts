import { Injectable } from '@nestjs/common';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { UserCommandRepository } from 'user/repositories/command/user-command.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}
  async execute(id: string): Promise<void> {
    const result = await this.userCommandRepository.deleteUser(id);

    if (result.affected === 0) {
      throw HttpExceptionFactory.NotFound('User', 'DeleteUserUseCase');
    }
  }
}
