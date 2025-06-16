import { Injectable } from '@nestjs/common';
import { RoleTemplateUseCase } from './role-template.usecase';
import { Role } from 'role/entities/role.entity';

@Injectable()
export class GetRoleById extends RoleTemplateUseCase {
  async execute(id: string): Promise<Role> {
    const role = this.repository.findOneBy({ id });
    return role;
  }
}
