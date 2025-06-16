import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from 'role/entities/role.entity';
import { Task } from 'task/entities/task.entity';
import { TaskList } from 'task-list/entities/task-list.entity';
import { Session } from 'auth/entities/session.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role: Role;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => TaskList, (taskList) => taskList.user, {
    cascade: true,
    eager: true,
  })
  taskLists: TaskList;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task;

  @OneToMany(() => Session, (session) => session.user, {
    cascade: true,
    eager: true,
  })
  sessions: Session;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
