import { ReactNode } from 'react';
import { useAppSelector } from '@/app/_hooks/hooks';

const AuthCheck = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth);

  return user.valid ? (
    children
  ) : (
    <main className="flex justify-center items-center w-full h-full bg-main">
      <div className="loading-spinner"></div>
    </main>
  );
};

export default AuthCheck;
