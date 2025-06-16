import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskList } from './entities/task-list.entity';

import { TaskListCommandController } from './controllers/command/task-list-command.controller';
import { TaskListQueryController } from './controllers/query/task-list-query.controller';

import { TaskListCommandRepository } from './repositories/command/task_list_command.repository';
import { TaskListQueryRepository } from './repositories/query/task_list_query.repository';

import { TaskListCommandService } from './services/command/task-list-command.service';
import { TaskListQueryService } from './services/query/task-list-query.service';

import { CreateTaskListUseCase } from './use-cases/create-task-list.usecase';
import { DeleteTaskListUseCase } from './use-cases/delete-task-list.usecase';
import { UpdateTaskListUseCase } from './use-cases/update-task-list.usecase';
import { GetTaskListByIdUseCase } from './use-cases/get-task-list-by-id.usecase';
import { GetUserOwnedTaskListUseCase } from './use-cases/get-user-owned-task-list.usecase';
import { GetUserOwnedTaskListsUseCase } from './use-cases/get-user-owned-task-lists.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  controllers: [TaskListCommandController, TaskListQueryController],
  providers: [
    TaskListCommandRepository,
    TaskListQueryRepository,
    TaskListQueryService,
    TaskListCommandService,
    CreateTaskListUseCase,
    DeleteTaskListUseCase,
    GetTaskListByIdUseCase,
    GetUserOwnedTaskListUseCase,
    GetUserOwnedTaskListsUseCase,
    UpdateTaskListUseCase,
  ],
  exports: [
    TaskListCommandRepository,
    TaskListQueryRepository,
    TaskListQueryService,
    TaskListCommandService,
    CreateTaskListUseCase,
    DeleteTaskListUseCase,
    GetTaskListByIdUseCase,
    GetUserOwnedTaskListUseCase,
    GetUserOwnedTaskListsUseCase,
    UpdateTaskListUseCase,
  ],
})
export class TaskListModule {}
