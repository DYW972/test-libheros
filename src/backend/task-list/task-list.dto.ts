import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTasksListDto {
  @IsNotEmpty()
  title: string;

  @IsUUID()
  userId: string;

  createdAt: Date;
}

export class UpdateTaskListDto extends PartialType(CreateTasksListDto) {}
