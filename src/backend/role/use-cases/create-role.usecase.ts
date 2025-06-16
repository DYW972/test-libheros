import { Injectable } from '@nestjs/common';
import { RoleTemplateUseCase } from './role-template.usecase';
import { CreateRoleInput } from '../schemas/role.schema';
import { Role } from 'role/entities/role.entity';

@Injectable()
export class CreateRoleUseCase extends RoleTemplateUseCase {
  async execute(data: CreateRoleInput): Promise<Role> {
    const role = this.repository.create(data);
    return await this.repository.save(role);
  }
}
