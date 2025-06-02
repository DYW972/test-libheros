import { TTask } from './Task';

export type TTaskCreateProps = {
  selectedListId: string;
  tasks: TTask[];
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
  selectedTaskId: string;
  setSelectedTaskId: (id: string) => void;
  fetchTasks: () => Promise<void>;
};
