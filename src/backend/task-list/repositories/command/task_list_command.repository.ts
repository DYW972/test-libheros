import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from 'task-list/entities/task-list.entity';
import { UpdateTaskList } from 'task-list/schemas/tasks-list.schema';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskListCommandRepository {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListCommandRepository: Repository<TaskList>,
  ) {}

  async saveTaskList(name: string, userId: string): Promise<TaskList> {
    const taskList = this.taskListCommandRepository.create({
      name: name,
      userId: userId,
    });
    return await this.taskListCommandRepository.save(taskList);
  }

  async updateTaskList(
    id: string,
    data: UpdateTaskList,
  ): Promise<UpdateResult> {
    const result = await this.taskListCommandRepository.update(
      { id: id },
      data,
    );
    return result;
  }

  async deleteTaskList(id: string): Promise<DeleteResult> {
    return await this.taskListCommandRepository.delete(id);
  }
}
