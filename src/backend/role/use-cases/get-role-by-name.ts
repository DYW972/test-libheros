import { Injectable } from '@nestjs/common';
import { RoleTemplateUseCase } from './role-template.usecase';
import { Role } from 'role/entities/role.entity';

@Injectable()
export class GetRoleByName extends RoleTemplateUseCase {
  async execute(name: string): Promise<Role> {
    const role = this.repository.findOneBy({ name });
    return role;
  }
}
