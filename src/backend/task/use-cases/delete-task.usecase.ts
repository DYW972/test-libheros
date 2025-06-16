import { Injectable } from '@nestjs/common';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { SuccessResponseFactory } from 'common/responses/success_response.factory';
import { TaskCommandRepository } from 'task/repositories/command/task-command.repository';
import { TaskQueryRepository } from 'task/repositories/query/task-query.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    protected readonly taskCommandRepository: TaskCommandRepository,
    protected readonly taskQueryRepository: TaskQueryRepository,
  ) {}
  async execute(taskId: string, userId: string) {
    if (!taskId || !userId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'Task id and user id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'DeleteTaskUseCase',
      });
    }
    const task = await this.taskQueryRepository.findOneByIdAndUserId(
      taskId,
      userId,
    );
    if (!task) {
      throw HttpExceptionFactory.NotFound('Task', 'DeleteTaskUseCase');
    }

    const deletedTask = await this.taskCommandRepository.deleteTask(taskId);
    if (deletedTask.affected === 0) {
      throw HttpExceptionFactory.NotFound('Task', 'DeleteTaskUseCase');
    }

    return SuccessResponseFactory.buildNoContentResponse(
      'Task deleted successfully.',
    );
  }
}
