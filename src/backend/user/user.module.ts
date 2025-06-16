import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

import { RoleModule } from 'role/role.module';
import { AuthModule } from 'auth/auth.module';

import { AdminController } from '../admin/controllers/command/admin-role-command.controller';
import { UserCommandController } from './controllers/command/user-command.controller';
import { UserQueryController } from './controllers/query/user-query.controller';

import { UserCommandRepository } from './repositories/command/user-command.repository';
import { UserQueryRepository } from './repositories/query/user-query.repository';

import { UserCommandService } from './services/command/user-command.service';
import { UserQueryService } from './services/query/user-query.service';
import { UserDeletionService } from './services/command/user-deletion.service';

import { PolicyLoaderService } from 'core/policy-loader.service';
import { PolicyHandlerRegistry } from 'common/policies/policy-handler.registry';

import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { GetUserByEmail } from './use-cases/get-user-by-email.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => RoleModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AdminController, UserCommandController, UserQueryController],
  providers: [
    UserCommandRepository,
    UserQueryRepository,
    UserCommandService,
    UserQueryService,
    UserDeletionService,
    PolicyLoaderService,
    PolicyHandlerRegistry,
    DeleteUserUseCase,
    UpdateUserUseCase,
    CreateUserUseCase,
    GetUserByEmail,
    GetUserByIdUseCase,
  ],
  exports: [
    UserCommandRepository,
    UserQueryRepository,
    UserCommandService,
    UserQueryService,
    UserDeletionService,
    PolicyLoaderService,
    PolicyHandlerRegistry,
    DeleteUserUseCase,
    UpdateUserUseCase,
    CreateUserUseCase,
    GetUserByEmail,
    GetUserByIdUseCase,
  ],
})
export class UserModule {}
