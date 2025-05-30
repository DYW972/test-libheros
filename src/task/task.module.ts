import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskGateway } from './task.gateway';
import { TaskController } from './task.controller';
import { TasksList } from '../tasks-list/tasks-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TasksList])],
  controllers: [TaskController],
  providers: [TaskService, TaskGateway],
  exports: [TaskService],
})
export class TaskModule {}
