import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '@/app/_hooks/hooks';
import { fetchAuthenticationStatus } from '@/app/_state/auth/authSlice';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { useRouter } from 'next/navigation';

const AuthCheck = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await dispatch(fetchAuthenticationStatus());

        if (!res.payload) {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, [dispatch]);

  return isAuthenticated ? (
    children
  ) : (
    <main className="flex justify-center items-center w-full h-full bg-main-background"></main>
  );
};

export default AuthCheck;
