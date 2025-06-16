import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';
import { Can } from 'common';
import { PoliciesGuard } from 'common';

@Controller('admin')
@UseGuards(AccessTokenGuard, PoliciesGuard)
export class AdminController {
  @Can('admin-only')
  @Get('admin-data')
  getAdminData() {
    return 'Only admin can see this';
  }
}
