import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleTemplateUseCase } from './role-template.usecase';

@Injectable()
export class DeleteRoleUseCase extends RoleTemplateUseCase {
  async execute(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Role id: ${id} not found`);
    }
  }
}
