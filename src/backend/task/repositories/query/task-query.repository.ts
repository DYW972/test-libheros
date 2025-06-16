import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { TaskOutput } from '../../schemas';
import { Repository } from 'typeorm';

@Injectable()
export class TaskQueryRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskQueryRepository: Repository<Task>,
  ) {}

  async findOneById(id: string): Promise<TaskOutput> {
    return await this.taskQueryRepository.findOneBy({ id: id });
  }

  async findOneByIdAndTaskListId(
    id: string,
    taskListId: string,
  ): Promise<TaskOutput> {
    return await this.taskQueryRepository.findOne({
      where: { id: id, taskListId: taskListId },
    });
  }

  async findAllByTaskListId(taskListId: string): Promise<TaskOutput[]> {
    return await this.taskQueryRepository.find({
      where: { taskListId: taskListId },
    });
  }

  async findOneByIdAndUserId(id: string, userId: string): Promise<TaskOutput> {
    return await this.taskQueryRepository.findOne({
      where: { id: id, userId: userId },
    });
  }

  async findAllByUserId(userId: string): Promise<TaskOutput[]> {
    return await this.taskQueryRepository.find({
      where: { userId: userId },
    });
  }
}
