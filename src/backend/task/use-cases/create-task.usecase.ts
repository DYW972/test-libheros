import { Injectable } from '@nestjs/common';

import { CreateTask, TaskOutput } from '../schemas/';
import { TaskListQueryRepository } from 'task-list/repositories/query/task_list_query.repository';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { TaskCommandRepository } from 'task/repositories/command/task-command.repository';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly taskListQueryRepository: TaskListQueryRepository,
    private readonly taskCommandRepository: TaskCommandRepository,
  ) {}
  async execute(data: CreateTask): Promise<TaskOutput> {
    if (!data.title || !data.taskListId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'Task title and task list id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'CreateTaskListUseCase',
      });
    }

    const taskListExists = await this.taskListQueryRepository.findOneById(
      data.taskListId,
    );

    if (!taskListExists) {
      throw HttpExceptionFactory.NotFound('TASKLIST');
    }
    const newTask = this.taskCommandRepository.saveTask(
      data.title,
      data.taskListId,
      data.userId,
    );
    return newTask;
  }
}
