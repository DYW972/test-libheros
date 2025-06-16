import { Injectable } from '@nestjs/common';
import { UserRoleEnum } from 'common';
import { RoleCommandService } from '../services/role-command.service';
import { RoleQueryService } from './role-query.service';
import { Role } from 'role/entities/role.entity';

@Injectable()
export class RoleDomainService {
  constructor(
    private readonly roleCommandService: RoleCommandService,
    private readonly roleQueryService: RoleQueryService,
  ) {}

  async getOrCreateDefaultRole(): Promise<Role> {
    const defaultRole = UserRoleEnum.Enum.user;
    let role = await this.roleQueryService.findOneByName(defaultRole);
    if (!role) {
      role = await this.roleCommandService.create({ name: defaultRole });
    }
    return role;
  }
}
