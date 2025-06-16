import { Controller, UseGuards, Get } from '@nestjs/common';

import { AccessTokenGuard } from '../../guards/access_token.guard';
import { CurrentUser } from 'common/decorators/current-user.decorator';

@Controller('auth')
export class AuthQueryController {
  @UseGuards(AccessTokenGuard)
  @Get('me')
  getProfile(
    @CurrentUser() user: { id: string; email: string; role: string },
  ): { id: string; email: string; role: string } {
    return user;
  }
}
