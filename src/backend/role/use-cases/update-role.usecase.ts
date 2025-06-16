import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleTemplateUseCase } from './role-template.usecase';
import { UpdateRoleInput } from 'role/schemas/role.schema';
import { Role } from 'role/entities/role.entity';

@Injectable()
export class UpdateRoleUseCase extends RoleTemplateUseCase {
  async execute(id: string, data: UpdateRoleInput): Promise<Role> {
    const result = await this.repository.update(id, data);

    if (result.affected === 0) {
      throw new NotFoundException(`Role id: ${id} not found`);
    }

    return await this.repository.findOneBy({ id });
  }
}
