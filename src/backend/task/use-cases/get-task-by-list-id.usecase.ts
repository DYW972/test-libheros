import { Injectable } from '@nestjs/common';
import { TaskQueryRepository } from 'task/repositories/query/task-query.repository';
import { TaskOutput } from 'task/schemas/task.schema';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';

@Injectable()
export class GetTaskByTaskListIdUseCase {
  constructor(protected readonly taskQueryRepository: TaskQueryRepository) {}
  async execute(id: string, taskListId: string): Promise<TaskOutput> {
    if (!id || !taskListId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'Task id and task list id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'GetTaskByTaskListIdUseCase',
      });
    }
    const task = await this.taskQueryRepository.findOneByIdAndTaskListId(
      id,
      taskListId,
    );

    if (!task) {
      throw HttpExceptionFactory.NotFound('Task', 'GetTaskByTaskListIdUseCase');
    }

    return task;
  }
}
