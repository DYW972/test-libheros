import { Injectable } from '@nestjs/common';
import {
  CreateTaskList,
  TaskListOutput,
} from 'task-list/schemas/tasks-list.schema';
import { TaskListCommandRepository } from '../repositories/command/task_list_command.repository';
import { HttpExceptionFactory } from 'common/exceptions/http-exception-factory.exception';

@Injectable()
export class CreateTaskListUseCase {
  constructor(
    private readonly taskListCommandRepository: TaskListCommandRepository,
  ) {}
  async execute(taskList: CreateTaskList): Promise<TaskListOutput> {
    if (!taskList.name || !taskList.userId) {
      throw HttpExceptionFactory.BadRequest({
        detail: 'Task list name and user id are required.',
        errorCode: 'INVALID_INPUT',
        context: 'CreateTaskListUseCase',
      });
    }

    const newTaskList = await this.taskListCommandRepository.saveTaskList(
      taskList.name,
      taskList.userId,
    );
    if (!newTaskList) {
      throw HttpExceptionFactory.Conflict('TaskList', 'CreateTaskListUseCase');
    }

    return newTaskList;
  }
}
