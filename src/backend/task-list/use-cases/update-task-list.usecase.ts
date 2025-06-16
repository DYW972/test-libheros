import { Injectable } from '@nestjs/common';
import {
  TaskListOutput,
  UpdateTaskList,
} from 'task-list/schemas/tasks-list.schema';

import { TaskListCommandRepository } from 'task-list/repositories/command/task_list_command.repository';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { TaskListQueryRepository } from 'task-list/repositories/query/task_list_query.repository';

@Injectable()
export class UpdateTaskListUseCase {
  constructor(
    protected readonly taskListCommandRepository: TaskListCommandRepository,
    protected readonly taskListQueryRepository: TaskListQueryRepository,
  ) {}
  async execute(id: string, data: UpdateTaskList): Promise<TaskListOutput> {
    if (!id || Object.entries(data).length === 0) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'TaskList id and data to update are required.',
        errorCode: 'INVALID_INPUT',
        context: 'UpdateTaskListUseCase',
      });
    }

    const result = await this.taskListCommandRepository.updateTaskList(id, {
      ...data,
    });

    if (result.affected === 0) {
      throw HttpExceptionFactory.NotFound('TaskList', 'UpdateTaskListUseCase');
    }

    return await this.taskListQueryRepository.findOneById(id);
  }
}
