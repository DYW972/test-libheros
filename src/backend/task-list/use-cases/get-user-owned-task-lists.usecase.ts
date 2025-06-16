import { Injectable } from '@nestjs/common';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { TaskListQueryRepository } from 'task-list/repositories/query/task_list_query.repository';
import { TaskListOutput } from 'task-list/schemas/tasks-list.schema';

@Injectable()
export class GetUserOwnedTaskListsUseCase {
  constructor(
    protected readonly taskListQueryRepository: TaskListQueryRepository,
  ) {}
  async execute(userId: string): Promise<TaskListOutput[]> {
    if (!userId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'User id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'GetUserOwnedTaskListsUseCase',
      });
    }
    const taskLists =
      await this.taskListQueryRepository.findAllByUserId(userId);

    if (!taskLists) {
      throw HttpExceptionFactory.NotFound(
        'TaskList',
        'GetUserOwnedTaskListsUseCase',
      );
    }

    return taskLists;
  }
}
