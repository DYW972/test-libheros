import { TaskType } from './task.type';

export type TasksComponentType = {
  tasks: TaskType[];
  values: TaskType;
  isLoading: boolean;
  isCreatingTask: boolean;
  handleSubmit: () => void;
  setSelectedTaskId: (id: string) => void;
  setIsCreatingTask: (value: boolean) => void;
  errors: Partial<Record<keyof TaskType, string>>;
  onTaskChange: (
    field: keyof TaskType,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};
