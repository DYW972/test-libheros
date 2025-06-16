import { fetchWithAutoRefresh } from './fetch-with-auto-refresh.api';
export const httpRequest = {
  async get(url: string, options: RequestInit = {}): Promise<Response> {
    return await fetchWithAutoRefresh(url, {
      method: 'GET',
      ...options,
    });
  },

  async post(
    url: string,
    body: any,
    options: RequestInit = {},
  ): Promise<Response> {
    return await fetchWithAutoRefresh(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  },

  async update(
    url: string,
    body: any,
    options: RequestInit = {},
  ): Promise<Response> {
    return await fetchWithAutoRefresh(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  },

  async delete(url: string, options: RequestInit = {}): Promise<Response> {
    return await fetchWithAutoRefresh(url, {
      method: 'DELETE',
      ...options,
    });
  },
};
