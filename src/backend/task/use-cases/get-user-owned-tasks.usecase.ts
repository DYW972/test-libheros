import { Injectable } from '@nestjs/common';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { TaskQueryRepository } from 'task/repositories/query/task-query.repository';
import { TaskOutput } from 'task/schemas/task.schema';

@Injectable()
export class GetUserOwnedTasksUseCase {
  constructor(protected readonly taskQueryRepository: TaskQueryRepository) {}
  async execute(userId: string): Promise<TaskOutput[]> {
    if (!userId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'User id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'GetUserOwnedTasksUseCase',
      });
    }
    const tasks = await this.taskQueryRepository.findAllByUserId(userId);

    if (!tasks) {
      throw HttpExceptionFactory.NotFound('Task', 'GetUserOwnedTasksUseCase');
    }

    return tasks;
  }
}
