export interface HttpResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  status?: number;
}
