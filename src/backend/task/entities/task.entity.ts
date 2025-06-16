import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { TTaskStatusEnum, TaskStatusEnum } from 'common';
import { User } from '../../user/entities/user.entity';
import { TaskList } from '../../task-list/entities/task-list.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum.Enum,
    default: TaskStatusEnum.Enum.todo,
  })
  status: TTaskStatusEnum;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  taskList: TaskList;

  @Column()
  taskListId: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
