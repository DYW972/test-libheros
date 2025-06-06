import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskListDTO {
  @IsNotEmpty()
  title: string;

  @IsUUID()
  userId: string;
}
