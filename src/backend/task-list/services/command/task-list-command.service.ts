import { Injectable } from '@nestjs/common';

import {
  CreateTaskListUseCase,
  DeleteTaskListUseCase,
  UpdateTaskListUseCase,
} from '../../use-cases';

import {
  CreateTaskList,
  TaskListOutput,
  UpdateTaskList,
} from 'task-list/schemas/tasks-list.schema';

@Injectable()
export class TaskListCommandService {
  constructor(
    private readonly createTaskListUseCase: CreateTaskListUseCase,
    private readonly updateTaskListUseCase: UpdateTaskListUseCase,
    private readonly deleteTaskListUseCase: DeleteTaskListUseCase,
  ) {}

  async create(data: CreateTaskList): Promise<TaskListOutput> {
    return await this.createTaskListUseCase.execute(data);
  }

  async update(id: string, data: UpdateTaskList): Promise<TaskListOutput> {
    return await this.updateTaskListUseCase.execute(id, data);
  }

  async delete(id: string, userId: string) {
    return await this.deleteTaskListUseCase.execute(id, userId);
  }
}
