import { Injectable } from '@nestjs/common';
import { TaskOutput, UpdateTask } from 'task/schemas/task.schema';

import { TaskCommandRepository } from 'task/repositories/command/task-command.repository';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { TaskQueryRepository } from 'task/repositories/query/task-query.repository';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    protected readonly taskCommandRepository: TaskCommandRepository,
    protected readonly taskQueryRepository: TaskQueryRepository,
  ) {}
  async execute(id: string, data: UpdateTask): Promise<TaskOutput> {
    if (!id || Object.entries(data).length === 0) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'Task id and data to update are required.',
        errorCode: 'INVALID_INPUT',
        context: 'UpdateTaskUseCase',
      });
    }

    const result = await this.taskCommandRepository.updateTask(id, {
      ...data,
    });

    if (result.affected === 0) {
      throw HttpExceptionFactory.NotFound('Task', 'UpdateTaskUseCase');
    }

    return await this.taskQueryRepository.findOneById(id);
  }
}
