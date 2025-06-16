import { TaskListsType } from './task-list.type';

export type TasksListSideBarPropsType = {
  isLoading: boolean;
  values: TaskListsType;
  selectedListId: string;
  tasksLists: TaskListsType[];
  confirmDeleteList: boolean;
  tasksListIdToDelete: string;
  isCreatingTasksList: boolean;
  errors: Partial<Record<keyof TaskListsType, string>>;
  tasksListNameAlreadyUsed: boolean;
  handleSubmitTasksList: () => void;
  handleDeleteTasksList: () => void;
  setSelectedListId: (id: string) => void;
  setConfirmDeleteList: (value: boolean) => void;
  setIsCreatingTasksList: (value: boolean) => void;
  handleShowModalConfirmDelete: (value: string) => void;
  onTasksListChange: (
    field: keyof TaskListsType,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};
