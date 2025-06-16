import { httpRequest } from '../api';
import { UserType } from '../types';

export const authService = {
  async register(name: string, email: string, password: string) {
    const response = await httpRequest.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        name,
        email,
        password,
      },
    );
    if (!response.ok) throw new Error('Login failed');
    return response;
  },

  async login(email: string, password: string) {
    const response = await httpRequest.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        email,
        password,
      },
    );
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response;
  },

  async getCurrentUser(): Promise<UserType> {
    const response = await httpRequest.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    );
    if (!response.ok) return null;
    const data = (await response.json()) as UserType;
    return data;
  },

  async logout(): Promise<void> {
    await httpRequest.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
      {},
    );
  },

  async refreshCookieSession(): Promise<boolean | null> {
    const response = await httpRequest.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {},
    );
    if (!response.ok) return null;
    return true;
  },
};
