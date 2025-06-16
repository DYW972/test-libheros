import { Injectable, OnModuleInit } from '@nestjs/common';
import { PolicyHandlerRegistry } from 'common/policies/policy-handler.registry';
import { AdminOnlyPolicy } from 'admin/policies/admin-only.policy';
import { UserOnlyPolicy } from 'user/policies/user-only.policy';

@Injectable()
export class PolicyLoaderService implements OnModuleInit {
  constructor(private readonly registry: PolicyHandlerRegistry) {}

  onModuleInit() {
    this.registry.register('admin-only', new AdminOnlyPolicy());
    this.registry.register('user-only', new UserOnlyPolicy());
  }
}
