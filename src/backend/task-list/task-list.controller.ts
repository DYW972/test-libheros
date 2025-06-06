import {
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { User } from 'shared/user.decorator';
import { TaskListService } from './task-list.service';
import { JwtAuthGuard } from '../authentication/jwt.guard';
import { CreateTaskListDTO, UpdateTaskListDTO } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('task-lists')
export class TaskListController {
  constructor(private readonly service: TaskListService) {}

  @Get(':id')
  findOneById(@Param('id') id: string, @User('id') userId: string) {
    return this.service.findUserOwnedList(id, userId);
  }

  @Get('')
  find(@User('id') userId: string) {
    return this.service.findUserAllOwnedList(userId);
  }

  @Post()
  create(@Body() body: CreateTaskListDTO) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskListDTO) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
