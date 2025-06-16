'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { TaskListsType } from '@/shared/types';
import { TaskListSchema } from '@/shared/schemas';
import { taskListsService } from '@/shared/services';

type TasksListsContextType = {
  tasksLists: TaskListsType[];
  isLoadingList: boolean | null;
  isCreatingList: boolean | null;
  activeTaskListId: string | null;
  createTasksList: (name: string) => Promise<void>;
  deleteTasksList: (id: string) => Promise<void>;
  selectTaskList: (id: string) => void;
  setIsCreatingList: (value: boolean | null) => void;
  refetchLists: () => Promise<void>;
};

const TasksListsContext = createContext<TasksListsContextType | undefined>(
  undefined,
);

export function TasksListsProvider({ children }: { children: ReactNode }) {
  const [tasksLists, setTasksLists] = useState<TaskListsType[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean | null>(null);
  const [isCreatingList, setIsCreatingList] = useState<boolean | null>(null);
  const [activeTaskListId, setActiveTaskListId] = useState<string | null>(null);

  const fetchTasksLists = async () => {
    setIsLoadingList(true);
    try {
      const data = await taskListsService.getTaskLists();
      setTasksLists(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingList(false);
    }
  };

  const createTasksList = async (name: string) => {
    try {
      const validatedData = TaskListSchema.parse({ name });
      const response = await taskListsService.createTaskList(validatedData);
      setTasksLists((prev) => [...prev, response] as TaskListsType[]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTasksList = async (id: string) => {
    try {
      await taskListsService.deleteTaskList(id);
      setTasksLists((prev) => prev.filter((list) => list.id !== id));
      setActiveTaskListId((current) => (current === id ? null : current));
    } catch (err) {
      console.error(err);
    }
  };

  const selectTaskList = (id: string) => {
    setActiveTaskListId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    void fetchTasksLists();
  }, []);

  return (
    <TasksListsContext.Provider
      value={{
        tasksLists,
        isLoadingList,
        isCreatingList,
        activeTaskListId,
        createTasksList,
        deleteTasksList,
        selectTaskList,
        setIsCreatingList,
        refetchLists: fetchTasksLists,
      }}
    >
      {children}
    </TasksListsContext.Provider>
  );
}

export function useTasksLists() {
  const context = useContext(TasksListsContext);
  if (!context) {
    throw new Error('useTasksLists must be used within a TasksListsProvider');
  }
  return context;
}
