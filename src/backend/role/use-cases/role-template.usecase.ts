import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from 'role/entities/role.entity';

@Injectable()
export class RoleTemplateUseCase {
  constructor(
    @InjectRepository(Role)
    protected readonly repository: Repository<Role>,
  ) {}
}
