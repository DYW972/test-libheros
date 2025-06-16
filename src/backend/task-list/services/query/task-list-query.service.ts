import { Injectable } from '@nestjs/common';

import {
  GetTaskListByIdUseCase,
  GetUserOwnedTaskListUseCase,
  GetUserOwnedTaskListsUseCase,
} from 'task-list/use-cases';
import { TaskListOutput } from 'task-list/schemas/tasks-list.schema';

@Injectable()
export class TaskListQueryService {
  constructor(
    private readonly getUserOwnedTaskLists: GetUserOwnedTaskListsUseCase,
    private readonly getUserOWnedTaskList: GetUserOwnedTaskListUseCase,
    private readonly getTaskListById: GetTaskListByIdUseCase,
  ) {}

  async findOneById(id: string): Promise<TaskListOutput> {
    return await this.getTaskListById.execute(id);
  }

  async findOneUserOwnedTaskList(
    listId: string,
    userId: string,
  ): Promise<TaskListOutput> {
    return await this.getUserOWnedTaskList.execute(listId, userId);
  }

  async findAllUserOwnedTaskLists(userId: string): Promise<TaskListOutput[]> {
    return await this.getUserOwnedTaskLists.execute(userId);
  }
}
