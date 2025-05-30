import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksList } from './tasks-list.entity';
import { TasksListService } from './tasks-list.service';
import { TasksListGateway } from './tasks-list.gateway';
import { TasksListController } from './tasks-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TasksList])],
  controllers: [TasksListController],
  providers: [TasksListService, TasksListGateway],
  exports: [TasksListService],
})
export class TasksListModule {}
