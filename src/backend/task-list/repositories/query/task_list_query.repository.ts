import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from 'task-list/entities/task-list.entity';
import { TaskListOutput } from 'task-list/schemas/tasks-list.schema';
import { Repository } from 'typeorm';

@Injectable()
export class TaskListQueryRepository {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListQueryRepository: Repository<TaskList>,
  ) {}

  async findOneById(id: string): Promise<TaskListOutput> {
    return await this.taskListQueryRepository.findOneBy({ id: id });
  }

  async findOneByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<TaskListOutput> {
    return await this.taskListQueryRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
  }

  async findAllByUserId(userId: string): Promise<TaskListOutput[]> {
    return await this.taskListQueryRepository.find({
      where: { user: { id: userId } },
    });
  }
}
