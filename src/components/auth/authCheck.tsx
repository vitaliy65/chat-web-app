import { ReactNode } from 'react';
import { useAppSelector } from '@/app/_hooks/hooks';

const AuthCheck = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    children
  ) : (
    <main className="flex justify-center items-center w-full h-full bg-main-background">
      <div className="loading-spinner"></div>
    </main>
  );
};

export default AuthCheck;
