import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskList } from './task-list.entity';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  controllers: [TaskListController],
  providers: [TaskListService],
  exports: [TaskListService],
})
export class TaskListModule {}
