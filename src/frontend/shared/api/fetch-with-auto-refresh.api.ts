import { authService } from '@/shared/services';
import router from 'next/router';

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

export async function fetchWithAutoRefresh(
  url: string,
  options: RequestInit,
): Promise<Response> {
  let response = await fetch(url, { ...options, credentials: 'include' });
  console.log(response);
  if (response.status === 401) {
    console.log('here');
    if (!isRefreshing) {
      console.log('here');

      isRefreshing = true;
      refreshPromise = authService.refreshCookieSession();
    }

    const refreshed = await refreshPromise;

    console.log(refreshed);
    if (refreshed) {
      response = await fetch(url, { ...options, credentials: 'include' });
    } else {
      void router.push('/');
      return Promise.reject(new Error('Unauthorized'));
    }
  }

  return response;
}
