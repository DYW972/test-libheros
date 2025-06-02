import { TTask } from './Task';

export type TTaskCreateFormProps = {
  task: TTask;
  todayISO: string;
  taskNameIsMissing: boolean;
  setTaskNameIsMissing: (value: boolean) => void;
  setTask: (partialTask: Partial<TTask>) => void;
  handleSubmit: () => void;
};
