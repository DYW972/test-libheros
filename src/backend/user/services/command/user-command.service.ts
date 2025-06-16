import { Injectable } from '@nestjs/common';
import { CreateUser, UpdateUser, UserOutput } from 'user/schemas/user.schema';
import { CreateUserUseCase } from 'user/use-cases/create-user.usecase';
import { DeleteUserUseCase } from 'user/use-cases/delete-user.usecase';
import { UpdateUserUseCase } from 'user/use-cases/update-user.usecase';

@Injectable()
export class UserCommandService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async create(data: CreateUser): Promise<UserOutput> {
    return await this.createUserUseCase.execute(data);
  }

  async update(id: string, values: UpdateUser): Promise<UserOutput> {
    return await this.updateUserUseCase.execute(id, values);
  }

  async delete(id: string): Promise<void> {
    return await this.deleteUserUseCase.execute(id);
  }
}
