import { TTasksList } from './TasksList';

export type TTasksListSideBarProps = {
  userId: string;
  tasksLists: TTasksList[];
  setTasksLists: React.Dispatch<React.SetStateAction<TTasksList[]>>;
  selectedListId: string;
  handleSelectedListId: (id: string) => void;
  confirmDeleteList: boolean;
  setConfirmDeleteList: (value: boolean) => void;
};
