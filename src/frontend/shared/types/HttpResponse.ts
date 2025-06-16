export type HttpResponseType<T = unknown> = {
  success: boolean;
  data: T;
  statusCode: number;
};
