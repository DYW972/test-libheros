import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Task } from '../task/task.entity';
import { TaskListStatus } from './task-list.enum';

@Entity('task_list')
export class TaskList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: TaskListStatus,
    default: TaskListStatus.OPEN,
  })
  status: TaskListStatus;

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;
}
