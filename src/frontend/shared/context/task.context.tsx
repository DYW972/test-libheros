'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { TaskType } from '@/shared/types';
import { TaskSchema } from '@/shared/schemas';
import { tasksService } from '@/shared/services';

type TasksContextType = {
  tasks: TaskType[];
  isLoadingTasks: boolean;
  isCreatingTask: boolean;
  activeTaskId: string | null;
  showSideBarTask: boolean;
  createTask: (
    title: string,
    description: string,
    dueDate: string,
    taskListId: string,
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  selectTask: (id: string) => void;
  setIsCreatingTask: (value: boolean) => void;
  setShowSideBarTask: (value: boolean) => void;
  refetch: () => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface TasksProviderProps {
  children: ReactNode;
  tasksListId: string;
}

export function TasksProvider({ children, tasksListId }: TasksProviderProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showSideBarTask, setShowSideBarTask] = useState(false);

  const fetchTasks = async () => {
    if (!tasksListId) return;
    setIsLoadingTasks(true);
    try {
      const data = await tasksService.getTasks(tasksListId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const createTask = async (
    title: string,
    description: string,
    dueDate: string,
    taskListId: string,
  ) => {
    try {
      const validatedData = TaskSchema.parse({
        title,
        description,
        dueDate,
        taskListId,
      });
      const response = await tasksService.createTask(validatedData);
      console.log(response);
      setTasks((prev) => [...prev, response] as TaskType[]);
      console.log(tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await tasksService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const selectTask = (id: string) => {
    setActiveTaskId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    void fetchTasks();
  }, [tasksListId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoadingTasks,
        isCreatingTask,
        activeTaskId,
        showSideBarTask,
        createTask,
        deleteTask,
        selectTask,
        setIsCreatingTask,
        setShowSideBarTask,
        refetch: fetchTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
