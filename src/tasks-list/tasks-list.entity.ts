import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';

@Entity('task_list')
export class TaskList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.taskLists, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}
