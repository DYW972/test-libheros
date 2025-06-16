import { Global, Module } from '@nestjs/common';
import { PolicyHandlerRegistry } from 'common/policies/policy-handler.registry';
import { PolicyLoaderService } from './policy-loader.service';

@Global()
@Module({
  providers: [PolicyHandlerRegistry, PolicyLoaderService],
  exports: [PolicyHandlerRegistry],
})
export class CoreModule {}
