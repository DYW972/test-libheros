import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Task } from '../../task/entities/task.entity';
import { TTaskListStatusEnum, TaskListStatusEnum } from 'common';

@Entity('task_lists')
export class TaskList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TaskListStatusEnum.Enum,
    default: TaskListStatusEnum.Enum.open,
  })
  status: TTaskListStatusEnum;

  @ManyToOne(() => User, (user) => user.taskLists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Task, (task) => task.taskList, {
    cascade: true,
  })
  tasks: Promise<Task[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
