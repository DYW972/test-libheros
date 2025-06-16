import { useEffect } from 'react';
import { Functions } from '@/shared';
import { useRouter } from 'next/navigation';

export function useAuthRedirect(): void {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const verify = async () => {
      const result = await Functions.checkAuth();
      if (isMounted && !result) {
        void router.replace('/');
        return;
      } else {
        void router.push('/dashboard');
      }
    };

    void verify();

    return () => {
      isMounted = false;
    };
  }, [router]);
}
