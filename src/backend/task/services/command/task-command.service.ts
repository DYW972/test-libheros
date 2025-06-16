import { Injectable } from '@nestjs/common';

import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  UpdateTaskUseCase,
} from '../../use-cases';

import { CreateTask, TaskOutput, UpdateTask } from 'task/schemas/task.schema';

@Injectable()
export class TaskCommandService {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async create(data: CreateTask): Promise<TaskOutput> {
    return await this.createTaskUseCase.execute(data);
  }

  async update(id: string, data: UpdateTask): Promise<TaskOutput> {
    return await this.updateTaskUseCase.execute(id, data);
  }

  async delete(id: string, userId: string) {
    return await this.deleteTaskUseCase.execute(id, userId);
  }
}
