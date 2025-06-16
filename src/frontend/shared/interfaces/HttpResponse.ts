export interface HttpResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
}
