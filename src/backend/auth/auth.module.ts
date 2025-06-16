import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Session } from './entities/session.entity';

import { UserModule } from 'user/user.module';

import { JwtAccessStrategy } from './strategies/jwt_access.strategy';

import { AccessTokenGuard } from './guards/access_token.guard';
import { RefreshTokenGuard } from './guards/refresh_token.guard';

import { AuthQueryController } from './controllers/query/auth_query.controller';
import { AuthCommandController } from './controllers/command/auth_command.controller';

import { SessionRepository } from './repositories/session.repository';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token/token.service';
import { PasswordService } from './services/password/password.service';
import { AppLogger } from 'common/services/logger.service';
import { AuthCookieService } from './services/cookie/auth-cookie.service';
import { RefreshTokenService } from './services/token/refresh_token.service';

import { SignUpUseCase } from './use_cases/sign_up.usecase';
import { SignInUseCase } from './use_cases/sign_in.usecase';
import { SignOutUseCase } from './use_cases/sign_out.usecase';
import { RefreshTokenUseCase } from './use_cases/refresh_token.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    forwardRef(() => UserModule),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { algorithm: 'HS512' },
      }),
    }),
  ],
  controllers: [AuthCommandController, AuthQueryController],
  providers: [
    JwtAccessStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
    SessionRepository,
    AuthService,
    TokenService,
    PasswordService,
    AppLogger,
    AuthCookieService,
    RefreshTokenService,
    SignUpUseCase,
    SignInUseCase,
    SignOutUseCase,
    RefreshTokenUseCase,
  ],
  exports: [
    JwtAccessStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
    SessionRepository,
    AuthService,
    TokenService,
    PasswordService,
    AuthCookieService,
    RefreshTokenService,
    SignUpUseCase,
    SignInUseCase,
    SignOutUseCase,
    RefreshTokenUseCase,
  ],
})
export class AuthModule {}
