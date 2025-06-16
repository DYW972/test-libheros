import { TaskQueryService } from '../../services';
import { Get, Param, Controller, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';

@UseGuards(AccessTokenGuard)
@Controller('tasks')
export class TaskQueryController {
  constructor(private readonly taskQueryService: TaskQueryService) {}

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.taskQueryService.findOneById(id);
  }

  @Get(':id/task-list/:taskListId')
  findOneByIdAndTasksListId(
    @Param('id') id: string,
    @Param('taskListId') taskListId: string,
  ) {
    return this.taskQueryService.findOneByIdAndTaskListId(id, taskListId);
  }

  @Get('task-list-id/:id')
  findAllByTaskListId(@Param('id') id: string) {
    return this.taskQueryService.findAllByTaskListId(id);
  }
}
