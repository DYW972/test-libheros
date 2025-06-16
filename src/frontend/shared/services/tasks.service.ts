import { httpRequest } from '../api';
import { TaskType } from '../types';

export const tasksService = {
  async getTasks(taskListId: string): Promise<TaskType[]> {
    const response = await httpRequest.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/task-list-id/${taskListId}`,
    );
    if (!response) throw new Error('Failed to fetch tasks');
    const data = (await response.json()) as TaskType[];
    return data;
  },

  async createTask(taskData: Partial<TaskType>): Promise<TaskType[]> {
    const response = await httpRequest.post(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
      taskData,
    );
    if (!response) throw new Error('Failed to create task');
    const data = (await response.json()) as TaskType[];
    return data;
  },

  async deleteTask(taskId: string): Promise<void> {
    const response = await httpRequest.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
    );
    if (!response) throw new Error('Failed to delete task');
  },
};
