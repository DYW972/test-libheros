import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from 'user/entities/user.entity';
import { Task } from '../task/entities/task.entity';
import { Role } from '../role/entities/role.entity';
import { TaskList } from '../task-list/entities/task-list.entity';
import { Session } from 'auth/entities/session.entity';

import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from 'common/common.module';
import { TaskListModule } from '../task-list/task-list.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.demo`, '.env.admin'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Session, User, TaskList, Task, Role],
      synchronize: process.env.APP_ENV === 'DEMO',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 5,
        },
      ],
    }),
    CommonModule,
    AuthModule,
    UserModule,
    RoleModule,
    TaskListModule,
    TaskModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
