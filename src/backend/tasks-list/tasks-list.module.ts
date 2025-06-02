import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksList } from './tasks-list.entity';
import { TasksListService } from './tasks-list.service';
import { TasksListController } from './tasks-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TasksList])],
  controllers: [TasksListController],
  providers: [TasksListService],
  exports: [TasksListService],
})
export class TasksListModule {}
