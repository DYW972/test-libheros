import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'task/entities/task.entity';
import { UpdateTask } from 'task/schemas/task.schema';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskCommandRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskCommandRepository: Repository<Task>,
  ) {}

  async saveTask(
    name: string,
    taskListId: string,
    userId: string,
  ): Promise<Task> {
    const task = this.taskCommandRepository.create({
      title: name,
      taskListId: taskListId,
      userId: userId,
    });
    return await this.taskCommandRepository.save(task);
  }

  async updateTask(id: string, data: UpdateTask): Promise<UpdateResult> {
    const result = await this.taskCommandRepository.update({ id: id }, data);
    return result;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.taskCommandRepository.delete(id);
  }
}
