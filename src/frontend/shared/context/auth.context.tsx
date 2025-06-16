'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '../types';
import { authService } from '../services';
import { useAuthHandler } from '../hooks/useAuthHandler';
import { localStorageService } from '../services/local-storage.service';

type AuthContextType = {
  user: UserType | null;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { handleAuth } = useAuthHandler();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        let currentUser = await authService.getCurrentUser();

        if (!currentUser) {
          const refreshed = await authService.refreshCookieSession();
          if (!refreshed) {
            throw new Error('Refresh session failed');
          }
          currentUser = await authService.getCurrentUser();
          router.push('/dashboard');
        }
        localStorageService.set('userId', currentUser.id);
        localStorageService.set('email', currentUser.email);
      } catch (error) {
        console.error(error);
        setUser(null);
        localStorageService.clear();
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    void checkUser();
  }, [user]);

  const signup = async (name: string, email: string, password: string) => {
    await handleAuth(
      authService.register(name, email, password),
      'Signup failed',
    ).then(async () => {
      const newUser = await authService.getCurrentUser();
      localStorageService.set('userId', newUser.id);
      localStorageService.set('email', newUser.email);
    });
  };

  const signin = async (email: string, password: string) => {
    await handleAuth(authService.login(email, password), 'Signin failed').then(
      async () => {
        const loggedUser = await authService.getCurrentUser();
        localStorageService.set('userId', loggedUser.id);
        localStorageService.set('email', loggedUser.email);
      },
    );
  };

  const signout = () => {
    void authService.logout();
    localStorageService.clear();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
