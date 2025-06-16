import { Body, Controller, Delete, Patch, UseGuards } from '@nestjs/common';
import { ValidationPipe } from 'common';
import {
  UpdateUser,
  UpdateUserSchema,
  UserOutput,
} from 'user/schemas/user.schema';
import { UserCommandService } from 'user/services/command/user-command.service';
import { AccessTokenGuard } from 'auth/guards/access_token.guard';
import { UserDeletionService } from 'user/services/command/user-deletion.service';
import { Cookies } from 'common/decorators/cookies.decorator';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UserCommandController {
  constructor(
    private readonly userCommandService: UserCommandService,
    private readonly userDeletetionService: UserDeletionService,
  ) {}

  @Patch()
  async update(
    @Cookies('user_id') id: string,
    @Body(new ValidationPipe(UpdateUserSchema))
    body: UpdateUser,
  ): Promise<UserOutput> {
    return await this.userCommandService.update(id, body);
  }

  @Delete()
  async delete(@Cookies('user_id') id: string): Promise<void> {
    return await this.userDeletetionService.deleteUserAndDependencies(id);
  }
}
