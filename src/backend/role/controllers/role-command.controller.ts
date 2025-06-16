import {
  Controller,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import * as Schemas from 'role/schemas/role.schema';
import { Role } from 'role/entities/role.entity';
import { RoleCommandService } from 'role/services/role-command.service';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';

@Controller('roles')
@UseGuards(AccessTokenGuard)
export class RoleCommandController {
  constructor(private readonly service: RoleCommandService) {}

  @Post()
  create(@Body() data: Schemas.CreateRoleInput): Promise<Role> {
    return this.service.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Schemas.UpdateRoleInput,
  ): Promise<Role> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
