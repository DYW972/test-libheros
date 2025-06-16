import { Interfaces } from '@/shared';

export function isHttpResponseError(
  data: unknown,
): data is Interfaces.HttpResponseError {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof (data as Record<string, unknown>).message === 'string'
  );
}
