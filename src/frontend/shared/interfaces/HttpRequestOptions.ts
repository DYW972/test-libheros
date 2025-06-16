export interface HttpRequestOptions<T = unknown> {
  method?: string;
  body?: T;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}
