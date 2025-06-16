import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';
import { PoliciesGuard } from 'common';
import { RoleQueryService } from 'role/services/role-query.service';

@Controller('roles')
@UseGuards(AccessTokenGuard, PoliciesGuard)
export class RoleQueryController {
  constructor(private readonly service: RoleQueryService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.service.findOneById(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.service.findOneByName(name);
  }
}
