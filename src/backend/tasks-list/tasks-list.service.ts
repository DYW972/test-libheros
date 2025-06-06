import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksList } from './tasks-list.entity';
import { CreateTasksListDto } from './taks-list.dto';

@Injectable()
export class TasksListService {
  constructor(
    @InjectRepository(TasksList)
    private tasksListRepository: Repository<TasksList>,
  ) {}

  async findOneById(id: string): Promise<TasksList> {
    const result = await this.tasksListRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!result) {
      throw new NotFoundException(`Tasks list id: ${id} not found`);
    }

    return result;
  }

  async findOneByUserId(id: string, userId: string): Promise<TasksList> {
    const result = await this.tasksListRepository.findOne({
      where: { id, userId },
    });

    if (!result) {
      throw new NotFoundException(
        `Tasks list id: ${id} by user id: ${userId} not found`,
      );
    }

    return result;
  }

  async findAll(): Promise<TasksList[]> {
    const result = await this.tasksListRepository.find();
    if (!result) {
      throw new NotFoundException(`Tasks lists not found`);
    }

    return result;
  }

  async findAllByUserId(userId: string): Promise<TasksList[]> {
    const result = await this.tasksListRepository.find({ where: { userId } });
    if (!result) {
      throw new NotFoundException(
        `Tasks lists by user id: ${userId} not found`,
      );
    }

    return result;
  }

  async create(data: Partial<CreateTasksListDto>): Promise<TasksList | object> {
    data.createdAt = new Date();
    const list = this.tasksListRepository.create(data);
    return this.tasksListRepository.save(list);
  }

  async update(
    id: string,
    values: Partial<TasksList>,
  ): Promise<TasksList | object> {
    const result = await this.tasksListRepository.update(id, values);
    if (!result) {
      throw new Error('Error update');
    }

    return this.findOneById(id);
  }

  async delete(id: string) {
    const result = await this.tasksListRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Tasks list not found');
    }

    return {
      message: `Tasks list id: ${id} deleted`,
    };
  }
}
