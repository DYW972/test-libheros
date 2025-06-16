import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TaskListQueryService } from '../../services/query/task-list-query.service';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';

@UseGuards(AccessTokenGuard)
@Controller('task-lists')
export class TaskListQueryController {
  constructor(private readonly taskListQueryService: TaskListQueryService) {}
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.taskListQueryService.findOneById(id);
  }

  @Get('id/:id')
  findOneListUserOwned(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskListQueryService.findOneUserOwnedTaskList(id, userId);
  }

  @Get('')
  findAll(@CurrentUser('id') id: string) {
    return this.taskListQueryService.findAllUserOwnedTaskLists(id);
  }
}
