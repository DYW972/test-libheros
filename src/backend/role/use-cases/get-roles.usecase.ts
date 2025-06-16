import { Injectable } from '@nestjs/common';
import { RoleTemplateUseCase } from './role-template.usecase';
import { Role } from 'role/entities/role.entity';

@Injectable()
export class GetRoles extends RoleTemplateUseCase {
  async execute(): Promise<Role[]> {
    const role = this.repository.find();
    return role;
  }
}
