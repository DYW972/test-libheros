import { TTasksList } from './TasksList';

export type TTask = {
  id?: string;
  title: string;
  description?: string;
  dueDate?: string;
  status?: 'todo' | 'in-progress' | 'done';
  taskListId: string;
  taskList?: TTasksList;
  createdAt?: string;
};
