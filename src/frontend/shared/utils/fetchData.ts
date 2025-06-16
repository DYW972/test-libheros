import { httpRequest } from './HttpRequest';
import { Interfaces } from '@/shared';
import { TaskListsType, TaskType, UserType } from '@/shared/types';

export async function fetchData<T extends Partial<TaskListsType | TaskType>>(
  endPoint: string,
  method?: string,
  body?: T,
): Promise<
  Interfaces.HttpResponse<Partial<TaskListsType[] | TaskType[] | UserType[]>>
> {
  try {
    const response = await httpRequest<T[]>(`${endPoint}`, { method, body });
    if (!response.success) {
      throw new Error('Fetching data failed');
    }

    return response;
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}
