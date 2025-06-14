import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from '../user/user.entity';
import { TasksList } from '../tasks-list/tasks-list.entity';
import { Task } from '../task/task.entity';

import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';
import { TasksListModule } from '../tasks-list/tasks-list.module';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.demo' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, TasksList, Task],
      synchronize: process.env.APP_ENV === 'DEMO',
    }),
    AuthModule,
    UserModule,
    TasksListModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
