import { Injectable } from '@nestjs/common';
import { TaskQueryRepository } from 'task/repositories/query/task-query.repository';
import { TaskOutput } from 'task/schemas/task.schema';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';

@Injectable()
export class GetUserOwnedTaskUseCase {
  constructor(protected readonly taskQueryRepository: TaskQueryRepository) {}
  async execute(id: string, userId: string): Promise<TaskOutput> {
    if (!id || !userId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'Task id and user id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'GetUserOwnedTaskUseCase',
      });
    }
    const task = await this.taskQueryRepository.findOneByIdAndUserId(
      id,
      userId,
    );

    if (!task) {
      throw HttpExceptionFactory.NotFound('Task', 'GetUserOwnedTaskUseCase');
    }

    return task;
  }
}
