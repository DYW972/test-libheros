import { Types } from '@/shared';
export interface HttpRequestOptions<T = unknown> {
  method?: Types.HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}
