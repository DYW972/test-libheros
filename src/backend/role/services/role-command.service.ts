import { Injectable } from '@nestjs/common';

import { Role } from '../entities/role.entity';
import {
  CreateRoleUseCase,
  UpdateRoleUseCase,
  DeleteRoleUseCase,
} from '../use-cases';
import { CreateRoleInput, UpdateRoleInput } from '../schemas/role.schema';

@Injectable()
export class RoleCommandService {
  constructor(
    private readonly createRole: CreateRoleUseCase,
    private readonly updateRole: UpdateRoleUseCase,
    private readonly deleteRole: DeleteRoleUseCase,
  ) {}

  async create(data: CreateRoleInput): Promise<Role> {
    return this.createRole.execute(data);
  }

  async update(id: string, data: UpdateRoleInput): Promise<Role> {
    return await this.updateRole.execute(id, data);
  }

  async delete(id: string) {
    return await this.deleteRole.execute(id);
  }
}
