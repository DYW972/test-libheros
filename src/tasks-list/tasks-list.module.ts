import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksList } from './tasks-list.entity';
import { TasksListController } from './tasks-list.controller';
import { TasksListService } from './tasks-list.service';
import { TasksListGateway } from './tasks-list.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([TasksList])],
  controllers: [TasksListController],
  providers: [TasksListService, TasksListGateway],
  exports: [TasksListService],
})
export class TasksListModule {}
