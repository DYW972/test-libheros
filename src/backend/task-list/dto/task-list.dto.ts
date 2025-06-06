import {
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { TaskDTO } from '../../task/dto/task.dto';
import { TaskListStatus } from 'task-list/task-list.enum';

export class TaskListDTO {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsUUID()
  userId: string;

  @IsEnum(TaskListStatus)
  status: TaskListStatus;

  @IsOptional()
  tasks?: TaskDTO[];

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
