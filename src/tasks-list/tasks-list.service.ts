import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskList } from './tasks-list.entity';

@Injectable()
export class TaskListsService {
  constructor(@InjectRepository(TaskList) private repo: Repository<TaskList>) {}

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['user', 'tasks'] });
  }

  create(data: Partial<TaskList>) {
    const list = this.repo.create(data);
    return this.repo.save(list);
  }

  async update(id: string, attrs: Partial<TaskList>) {
    await this.repo.update(id, attrs);
    return this.findOne(id);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
