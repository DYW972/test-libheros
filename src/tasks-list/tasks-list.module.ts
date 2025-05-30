import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskList } from './tasks-list.entity';
import { TaskListsController } from './tasks-list.controller';
import { TaskListsService } from './tasks-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  controllers: [TaskListsController],
  providers: [TaskListsService],
  exports: [TaskListsService],
})
export class TaskListModule {}
