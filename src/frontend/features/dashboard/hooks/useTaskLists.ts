import { useState, useEffect } from 'react';

import { TaskListsType } from '@/shared/types';
import { TaskListSchema } from '@/shared/schemas';
import { taskListsService } from '@/shared/services';

export function useTasksLists() {
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
      const newList = await taskListsService.createTaskList(validatedData);
      setTasksLists(newList);
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

  return {
    tasksLists,
    isLoadingList,
    isCreatingList,
    activeTaskListId,
    createTasksList,
    deleteTasksList,
    selectTaskList,
    setIsCreatingList,
    refetchLists: fetchTasksLists,
  };
}
