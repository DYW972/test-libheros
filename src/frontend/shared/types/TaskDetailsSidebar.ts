import { TTask } from './Task';

export type TaskDetailsSidebarProps = {
  selectedTask: TTask;
  confirmDeleteTask: boolean | null;
  setConfirmDeleteTask: (val: boolean | null) => void;
  tasks: TTask[];
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
  setSelectedTaskId: (id: string) => void;
  fetchTasks: () => Promise<void>;
};
