import { useState, useEffect } from 'react';
import { TaskType } from '@/shared/types';
import { TaskSchema } from '@/shared/schemas';
import { tasksService } from '@/shared/services';

export function useTasks(tasksListId: string | undefined) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoadingTasks, setIsLoadingTask] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState<boolean | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showSideBarDetails, setShowSideBarDetails] = useState<boolean | null>(
    null,
  );

  const fetchTasks = async () => {
    if (!tasksListId) return;
    setIsLoadingTask(true);
    try {
      const data = await tasksService.getTasks(tasksListId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTask(false);
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
      const response = await tasksService.createTask({
        ...validatedData,
      });
      console.log(response);
      setTasks((prev) => [...prev, response] as TaskType[]);
    } catch (err) {
      console.error(err);
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

  return {
    tasks,
    isLoadingTasks,
    isCreatingTask,
    activeTaskId,
    setIsCreatingTask,
    showSideBarDetails,
    setShowSideBarDetails,
    createTask,
    deleteTask,
    selectTask,
    refetchTasks: fetchTasks,
  };
}
