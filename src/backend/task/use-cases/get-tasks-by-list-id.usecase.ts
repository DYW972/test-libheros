import { Injectable } from '@nestjs/common';
import { TaskQueryRepository } from 'task/repositories/query/task-query.repository';
import { TaskOutput } from 'task/schemas/task.schema';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';

@Injectable()
export class GetTasksByTaskListIdUseCase {
  constructor(protected readonly taskQueryRepository: TaskQueryRepository) {}
  async execute(taskListId: string): Promise<TaskOutput[]> {
    if (!taskListId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'Task list id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'GetTasksByTaskListIdUseCase',
      });
    }
    const tasks =
      await this.taskQueryRepository.findAllByTaskListId(taskListId);

    if (!tasks) {
      throw HttpExceptionFactory.NotFound(
        'Task',
        'GetTasksByTaskListIdUseCase',
      );
    }

    return tasks;
  }
}
