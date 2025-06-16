import { Interfaces, Functions } from '@/shared';

export async function httpRequest<TResponse = unknown, TRequest = unknown>(
  url: string,
  options: Interfaces.HttpRequestOptions<TRequest> = {},
): Promise<Interfaces.HttpResponse<TResponse>> {
  const {
    method = 'GET',
    body,
    headers = {},
    credentials = 'include',
  } = options;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method,
      credentials,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = res.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    const rawData: unknown = isJson ? await res.json() : null;
    const data = rawData as TResponse;

    console.log(rawData);

    if (!res.ok) {
      const message = Functions.isHttpResponseError(data)
        ? data.message
        : res.statusText;
      return {
        success: false,
        message,
        data,
        statusCode: res.status,
      };
    }

    return {
      success: true,
      data,
      statusCode: res.status,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
