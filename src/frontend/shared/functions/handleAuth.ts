import { Types } from '@/shared';
import { httpRequest } from './HttpRequest';
import { logError } from './LogError';

export async function handleAuth(
  endpoint: string,
  values: Types.TUser,
  reset: () => void,
): Promise<true> {
  try {
    const response = await httpRequest<Types.TUser>(endpoint, {
      method: 'POST',
      body: values,
    });

    if (!response.success) {
      throw new Error(response.message ?? 'Authentication failed');
    }

    const user = response.data;
    if (!user?.id || !user?.email) {
      throw new Error('Invalid user data received from server');
    }

    localStorage.setItem('userID', `${user.id}`);
    localStorage.setItem('email', `${user.email}`);

    return true;
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    logError('Auth error', error);
  } finally {
    reset();
  }
}
