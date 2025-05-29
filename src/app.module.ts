import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user/user.entity';
import { TaskList } from './tasks-list/tasks-list.entity';
import { Task } from './task/task.entity';

console.log(process.env);
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
      entities: [User, TaskList, Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, TaskList, Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
