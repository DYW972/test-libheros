import { Injectable } from '@nestjs/common';

import {
  GetTaskByIdUseCase,
  GetTaskByTaskListIdUseCase,
  GetTasksByTaskListIdUseCase,
  GetUserOwnedTaskUseCase,
} from 'task/use-cases';
import { TaskOutput } from 'task/schemas/task.schema';

@Injectable()
export class TaskQueryService {
  constructor(
    private readonly getTaskById: GetTaskByIdUseCase,
    private readonly getTaskByTaskListIdUseCase: GetTaskByTaskListIdUseCase,
    private readonly getTasksByTaskListIdUseCase: GetTasksByTaskListIdUseCase,
    private readonly getTaskByUserIdUseCase: GetUserOwnedTaskUseCase,
  ) {}

  async findOneById(id: string): Promise<TaskOutput> {
    return await this.getTaskById.execute(id);
  }

  async findOneByIdAndTaskListId(
    id: string,
    taskListId: string,
  ): Promise<TaskOutput> {
    return await this.getTaskByTaskListIdUseCase.execute(id, taskListId);
  }

  async findAllByTaskListId(userId: string): Promise<TaskOutput[]> {
    return await this.getTasksByTaskListIdUseCase.execute(userId);
  }

  async findOneByUserId(id: string, userId: string): Promise<TaskOutput> {
    return await this.getTaskByUserIdUseCase.execute(id, userId);
  }

  async findAllByUserId(userId: string): Promise<TaskOutput[]> {
    return await this.getTasksByTaskListIdUseCase.execute(userId);
  }
}
