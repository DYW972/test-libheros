import { TaskType } from './task.type';

export type TaskCreateFormPropsType = {
  values: {
    title?: string;
    description?: string;
    dueDate?: string;
    taskListId?: string;
  };
  errors: Partial<Record<keyof TaskType, string>>;
  onChange: (
    field: keyof TaskType,
  ) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
  ) => void;
  onSubmit: () => void;
};
