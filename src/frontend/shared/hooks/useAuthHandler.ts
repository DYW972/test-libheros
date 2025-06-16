import { useRouter } from 'next/navigation';
import { localStorageService } from '../services/local-storage.service';

export const useAuthHandler = () => {
  const router = useRouter();

  const handleAuth = async (
    authRequest: Promise<Response>,
    errorMessage = 'Authentication failed',
  ): Promise<void> => {
    try {
      const response = await authRequest;

      if (!response.ok) throw new Error(errorMessage);

      const json = (await response.json()) as {
        id: string;
        email: string;
      };
      localStorageService.set('email', json.email);
      localStorageService.set('userId', json.id);

      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
      router.push('/');
    }
  };

  return { handleAuth };
};
