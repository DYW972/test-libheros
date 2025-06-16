import { Injectable } from '@nestjs/common';
import { TaskListQueryRepository } from 'task-list/repositories/query/task_list_query.repository';
import { TaskListOutput } from 'task-list/schemas/tasks-list.schema';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';

@Injectable()
export class GetUserOwnedTaskListUseCase {
  constructor(
    protected readonly taskListQueryRepository: TaskListQueryRepository,
  ) {}
  async execute(listId: string, userId: string): Promise<TaskListOutput> {
    if (!listId || !userId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'TaskList id and user id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'GetUserOwnedTaskListUseCase',
      });
    }
    const taskList = await this.taskListQueryRepository.findOneByIdAndUserId(
      listId,
      userId,
    );

    if (!taskList) {
      throw HttpExceptionFactory.NotFound(
        'TaskList',
        'GetUserOwnedTaskListUseCase',
      );
    }

    return taskList;
  }
}
