import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { TasksList } from '../tasks-list/tasks-list.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TasksList)
    private readonly taskListRepository: Repository<TasksList>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const taskList = await this.taskListRepository.findOneBy({
      id: createTaskDto.taskListId,
    });
    if (!taskList) {
      throw new NotFoundException('TaskList not found');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      taskList,
    });
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['taskList'] });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['taskList'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findByTaskList(taskListId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { taskList: { id: taskListId } },
      relations: ['taskList'],
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
