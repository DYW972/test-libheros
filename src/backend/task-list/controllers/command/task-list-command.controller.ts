import {
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from 'common';
import {
  CreateTaskList,
  CreateTaskListSchema,
  UpdateTaskListSchema,
  UpdateTaskList,
} from '../../schemas';
import { TaskListCommandService } from '../../services';
import { Cookies } from 'common/decorators/cookies.decorator';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';

@UseGuards(AccessTokenGuard)
@Controller('task-lists')
export class TaskListCommandController {
  constructor(
    private readonly taskListCommandService: TaskListCommandService,
  ) {}

  @Post()
  create(
    @Body(new ValidationPipe(CreateTaskListSchema)) body: CreateTaskList,
    @Cookies('user_id') userId: string,
  ) {
    const taskList: CreateTaskList = { ...body, userId };
    return this.taskListCommandService.create(taskList);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateTaskListSchema)) body: UpdateTaskList,
  ) {
    return this.taskListCommandService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Cookies('user_id') userId: string) {
    return this.taskListCommandService.delete(id, userId);
  }
}
