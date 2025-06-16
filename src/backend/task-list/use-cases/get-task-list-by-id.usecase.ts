import { Injectable } from '@nestjs/common';
import { TaskListQueryRepository } from 'task-list/repositories/query/task_list_query.repository';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';
import { TaskListOutput } from 'task-list/schemas/tasks-list.schema';

@Injectable()
export class GetTaskListByIdUseCase {
  constructor(
    protected readonly taskListQueryRepository: TaskListQueryRepository,
  ) {}
  async execute(id: string): Promise<TaskListOutput> {
    const taskList = await this.taskListQueryRepository.findOneById(id);

    if (!taskList) {
      throw HttpExceptionFactory.NotFound('TaskList', 'GetTaskListByIdUseCase');
    }

    return taskList;
  }
}
