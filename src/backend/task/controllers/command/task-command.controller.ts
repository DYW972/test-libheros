import {
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from 'common';
import {
  CreateTaskSchema,
  CreateTask,
  UpdateTask,
  UpdateTaskSchema,
} from '../../schemas';
import { TaskCommandService } from '../../services';
import { Cookies } from 'common/decorators/cookies.decorator';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';

@UseGuards(AccessTokenGuard)
@Controller('tasks')
export class TaskCommandController {
  constructor(private readonly taskCommandService: TaskCommandService) {}

  @Post()
  create(
    @Body(new ValidationPipe(CreateTaskSchema))
    body: CreateTask,
    @Cookies('user_id') userId: string,
  ) {
    const task: CreateTask = { ...body, userId };
    return this.taskCommandService.create(task);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateTaskSchema))
    body: UpdateTask,
  ) {
    return this.taskCommandService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Cookies('user_id') userId: string) {
    return this.taskCommandService.delete(id, userId);
  }
}
