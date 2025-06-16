import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'user/entities/user.entity';
import { Session } from 'auth/entities/session.entity';
import { Task } from 'task/entities/task.entity';
import { TaskList } from 'task-list/entities/task-list.entity';

@Injectable()
export class UserDeletionService {
  constructor(private readonly dataSource: DataSource) {}

  async deleteUserAndDependencies(userId: string): Promise<void> {
    await this.dataSource.transaction(async (entityManager) => {
      await entityManager.delete(Session, { userId: userId });

      await entityManager.delete(Task, { user: { id: userId } });

      await entityManager.delete(TaskList, { userId: userId });

      await entityManager.delete(User, { id: userId });
    });
  }
}
