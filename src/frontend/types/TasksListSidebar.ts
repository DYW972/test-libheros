export type Body = {
  title: string;
  user: string;
};

export type TasksList = {
  id: string;
  title: string;
  createdAt: string;
  user: string;
};

export type Props = {
  userId: string;
  tasksLists: TasksList[];
  setTasksLists: React.Dispatch<React.SetStateAction<TasksList[]>>;
  selectedListId: string;
  setSelectedListId: (id: string) => void;
  confirmDeleteList: boolean;
  setConfirmDeleteList: (value: boolean) => void;
};
