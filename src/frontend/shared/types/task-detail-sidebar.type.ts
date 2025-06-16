import { TaskType } from './task.type';

export type TaskDetailsSidebarPropsType = {
  selectedTask: TaskType;
  confirmDeleteTask: boolean | null;
  setConfirmDeleteTask: (val: boolean | null) => void;
  setSelectedTaskId: (value: null) => void;
  handleDeleteTask: () => void;
};
