import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';
import { Cookies } from 'common/decorators/cookies.decorator';
import { UserQueryService } from 'user/services/query/user-query.service';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UserQueryController {
  constructor(private readonly userQueryService: UserQueryService) {}
  @Get('')
  findOneById(@Cookies('user_id') id: string) {
    return this.userQueryService.findOneById(id);
  }
}
