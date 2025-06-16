import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';

import { TaskCommandController } from './controllers/command/task-command.controller';
import { TaskQueryController } from './controllers/query/task-query.controller';

import { TaskCommandRepository } from './repositories/command/task-command.repository';
import { TaskQueryRepository } from './repositories/query/task-query.repository';

import { TaskQueryService } from './services/query/task-query.service';
import { TaskCommandService } from './services/command/task-command.service';

import { CreateTaskUseCase } from './use-cases/create-task.usecase';
import { DeleteTaskUseCase } from './use-cases/delete-task.usecase';
import { UpdateTaskUseCase } from './use-cases/update-task.usecase';
import { GetTaskByIdUseCase } from './use-cases/get-task-by-id.usecase';
import { GetTaskByTaskListIdUseCase } from './use-cases/get-task-by-list-id.usecase';
import { GetTasksByTaskListIdUseCase } from './use-cases/get-tasks-by-list-id.usecase';
import { GetUserOwnedTaskUseCase } from './use-cases/get-user-owned-task.usecase';
import { TaskListModule } from 'task-list/task-list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TaskListModule],
  controllers: [TaskCommandController, TaskQueryController],
  providers: [
    TaskCommandRepository,
    TaskQueryRepository,
    TaskCommandService,
    TaskQueryService,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    GetTaskByIdUseCase,
    GetTaskByTaskListIdUseCase,
    GetUserOwnedTaskUseCase,
    GetTasksByTaskListIdUseCase,
  ],
  exports: [
    TaskCommandRepository,
    TaskQueryRepository,
    TaskCommandService,
    TaskQueryService,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    GetTaskByIdUseCase,
    GetTaskByTaskListIdUseCase,
    GetUserOwnedTaskUseCase,
    GetTasksByTaskListIdUseCase,
  ],
})
export class TaskModule {}
