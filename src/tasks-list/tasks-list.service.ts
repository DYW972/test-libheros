import { Repository } from 'typeorm';
import { TasksList } from './tasks-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksListService {
  constructor(
    @InjectRepository(TasksList)
    private tasksListRepository: Repository<TasksList>,
  ) {}

  async findAll() {
    return this.tasksListRepository.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    return this.tasksListRepository.findOne({
      where: { id },
      relations: ['user', 'tasks'],
    });
  }

  async create(data: Partial<TasksList>) {
    const list = this.tasksListRepository.create(data);
    return this.tasksListRepository.save(list);
  }

  async findByUser(userId: string): Promise<TasksList[]> {
    return this.tasksListRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async update(id: string, attrs: Partial<TasksList>) {
    await this.tasksListRepository.update(id, attrs);
    return this.findOne(id);
  }

  async delete(id: string) {
    const result = await this.tasksListRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
