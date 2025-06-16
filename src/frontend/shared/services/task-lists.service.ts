import { httpRequest } from '../api';
import { TaskListsType } from '../types';

export const taskListsService = {
  async getTaskLists(): Promise<TaskListsType[]> {
    const response = await httpRequest.get(
      `${process.env.NEXT_PUBLIC_API_URL}/task-lists`,
    );
    if (!response) throw new Error('Failed to fetch task lists');
    const data = (await response.json()) as TaskListsType[];
    return data;
  },

  async createTaskList(
    taskListData: Partial<TaskListsType>,
  ): Promise<TaskListsType[]> {
    const response = await httpRequest.post(
      `${process.env.NEXT_PUBLIC_API_URL}/task-lists`,
      taskListData,
    );
    if (!response) throw new Error('Failed to create task list');
    const data = (await response.json()) as TaskListsType[];
    return data;
  },

  async deleteTaskList(taskListId: string): Promise<void> {
    const response = await httpRequest.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/task-lists/${taskListId}`,
    );
    if (!response) throw new Error('Failed to delete task list');
  },
};
