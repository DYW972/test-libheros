export interface HttpResponseError {
  message?: string;
  statusCode: number;
  [key: string]: unknown;
}
