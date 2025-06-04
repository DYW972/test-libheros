import { httpRequest } from './HttpRequest';
import { logError } from './LogError';
import { Types } from '@/shared';

export async function checkAuth(): Promise<true> {
  try {
    const response = await httpRequest<Types.TUser>(`/auth/me`);

    if (!response.success) {
      throw new Error(response.message ?? 'Authentication failed');
    }

    const user = response.data;
    if (!user?.id || !user?.email) {
      throw new Error('Invalid user data received from server');
    }

    return true;
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    logError('Check Auth', error);
  }
}
