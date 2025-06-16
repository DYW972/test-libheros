import { Injectable } from '@nestjs/common';
import { GetRoleById, GetRoleByName, GetRoles } from '../use-cases';

import { Role } from '../entities/role.entity';

@Injectable()
export class RoleQueryService {
  constructor(
    private readonly getRoleById: GetRoleById,
    private readonly getRoleByName: GetRoleByName,
    private readonly getRoles: GetRoles,
  ) {}

  async findOneById(id: string): Promise<Role> {
    return await this.getRoleById.execute(id);
  }

  async findOneByName(name: string): Promise<Role> {
    return await this.getRoleByName.execute(name);
  }

  async findAll(): Promise<Role[]> {
    return await this.getRoles.execute();
  }
}
