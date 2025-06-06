import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskListStatus } from 'task-list/task-list.enum';

export class UpdateTaskListDTO {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsEnum(TaskListStatus)
  status?: TaskListStatus;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
