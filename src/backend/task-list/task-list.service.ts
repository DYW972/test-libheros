import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskList } from './task-list.entity';
import { TaskListDTO, CreateTaskListDTO, UpdateTaskListDTO } from './dto';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}

  async findOneById(id: string): Promise<TaskListDTO> {
    const result = await this.taskListRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!result) {
      throw new NotFoundException(`Tasks list id: ${id} not found`);
    }

    return result;
  }

  async findUserOwnedList(id: string, userId: string): Promise<TaskListDTO> {
    const result = await this.taskListRepository.findOne({
      where: { id, userId },
      relations: ['tasks'],
    });

    if (!result) {
      throw new NotFoundException(
        `Tasks list id: ${id} by user id: ${userId} not found`,
      );
    }

    return result;
  }

  async findAll(): Promise<TaskListDTO[]> {
    return await this.taskListRepository.find({
      relations: ['tasks'],
    });
  }

  async findUserAllOwnedList(userId: string): Promise<TaskListDTO[]> {
    return await this.taskListRepository.find({
      where: { userId },
      relations: ['tasks'],
    });
  }

  async create(data: CreateTaskListDTO): Promise<TaskListDTO> {
    const list = this.taskListRepository.create(data);
    return this.taskListRepository.save(list);
  }

  async update(id: string, values: UpdateTaskListDTO): Promise<TaskListDTO> {
    values.updatedAt = new Date();

    const result = await this.taskListRepository.update(id, values);

    if (result.affected === 0) {
      throw new NotFoundException(`Tasks list with id ${id} not found`);
    }

    return this.findOneById(id);
  }

  async delete(id: string) {
    const result = await this.taskListRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Tasks list not found');
    }

    return {
      message: `Tasks list id: ${id} deleted`,
    };
  }
}
