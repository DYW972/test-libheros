import { Injectable } from '@nestjs/common';
import { TaskQueryRepository } from 'task/repositories/query/task-query.repository';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { TaskOutput } from 'task/schemas/task.schema';

@Injectable()
export class GetTaskByIdUseCase {
  constructor(protected readonly taskQueryRepository: TaskQueryRepository) {}
  async execute(id: string): Promise<TaskOutput> {
    const task = await this.taskQueryRepository.findOneById(id);

    if (!task) {
      throw HttpExceptionFactory.NotFound('Task', 'GetTaskByIdUseCase');
    }

    return task;
  }
}
