import { TaskListsType } from './task-list.type';

export type TasksListCreateFormPropsType = {
  value: string;
  nameAlreadyUsed: boolean;
  errors: Partial<Record<keyof TaskListsType, string>>;
  onChange: (
    field: keyof TaskListsType,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};
