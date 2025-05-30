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

@Entity('tasks_list')
export class TasksList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasksList, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}
