import { Injectable } from '@nestjs/common';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { SuccessResponseFactory } from 'common/responses/success_response.factory';
import { TaskListCommandRepository } from 'task-list/repositories/command/task_list_command.repository';
import { TaskListQueryRepository } from 'task-list/repositories/query/task_list_query.repository';

@Injectable()
export class DeleteTaskListUseCase {
  constructor(
    protected readonly taskListCommandRepository: TaskListCommandRepository,
    protected readonly taskListQueryRepository: TaskListQueryRepository,
  ) {}
  async execute(taskListId: string, userId: string) {
    if (!taskListId || !userId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'TaskList id and user id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'DeleteTaskListUseCase',
      });
    }
    const taskList = await this.taskListQueryRepository.findOneByIdAndUserId(
      taskListId,
      userId,
    );
    if (!taskList) {
      throw HttpExceptionFactory.NotFound('TaskList', 'DeleteTaskListUseCase');
    }

    const deletedTaskList =
      await this.taskListCommandRepository.deleteTaskList(taskListId);
    if (deletedTaskList.affected === 0) {
      throw HttpExceptionFactory.NotFound('TaskList', 'DeleteTaskListUseCase');
    }

    return SuccessResponseFactory.buildNoContentResponse(
      'Task list deleted successfully.',
    );
  }
}
