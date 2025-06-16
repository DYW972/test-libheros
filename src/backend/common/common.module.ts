import { Module, Global } from '@nestjs/common';
import { RequestContext } from './utils/request-context.util';

@Global()
@Module({
  providers: [RequestContext],
  exports: [RequestContext],
})
export class CommonModule {}
