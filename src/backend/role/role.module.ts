import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './entities/role.entity';

import { CreateRoleUseCase } from './use-cases/create-role.usecase';
import { DeleteRoleUseCase } from './use-cases/delete-role.usecase';
import { UpdateRoleUseCase } from './use-cases/update-role.usecase';
import { GetRoleById } from './use-cases/get-role-by-id.usecase';
import { GetRoleByName } from './use-cases/get-role-by-name';
import { GetRoles } from './use-cases/get-roles.usecase';

import { RoleDomainService } from './services/role-domain.service';
import { RoleCommandService } from './services/role-command.service';
import { RoleQueryService } from './services/role-query.service';

import { RoleCommandController } from './controllers/role-command.controller';
import { RoleQueryController } from './controllers/role-query.controller';

import { AuthModule } from 'auth/auth.module';
import { PolicyHandlerRegistry } from 'common';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => AuthModule)],
  controllers: [RoleCommandController, RoleQueryController],
  providers: [
    RoleDomainService,
    RoleCommandService,
    RoleQueryService,
    PolicyHandlerRegistry,
    CreateRoleUseCase,
    DeleteRoleUseCase,
    UpdateRoleUseCase,
    GetRoleById,
    GetRoleByName,
    GetRoles,
  ],
  exports: [RoleDomainService, RoleCommandService, RoleQueryService],
})
export class RoleModule {}
