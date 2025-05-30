import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTasksListDto {
  @IsNotEmpty()
  title: string;

  @IsUUID()
  userId: string;
}

export class UpdateTaskListDto extends PartialType(CreateTasksListDto) {}
