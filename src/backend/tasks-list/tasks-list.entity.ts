import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Task } from '../task/task.entity';

@Entity('tasks_list')
export class TasksList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  userId: string;

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;
}
