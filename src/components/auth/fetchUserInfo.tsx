'use client';

import { ReactNode, useEffect, useState } from 'react';
import { fetchAuthenticationStatus } from '@/app/_state/auth/authSlice';
import { useRouter } from 'next/navigation';
import { fetchFriends } from '@/app/_state/friend/friendSlice';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { fetchFriendRequests } from '@/app/_state/friendRequest/friendRequestSlice';
import { updateUserInfo } from '@/app/_state/user/userSlice';

export default function FetchUserInfo({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(updateUserInfo());
        await dispatch(fetchFriends());
        await dispatch(fetchFriendRequests());
        const res = await dispatch(fetchAuthenticationStatus());

        if (!res.payload.valid) {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
    setLoading(false);
  }, []);

  return loading ? (
    <main className="flex justify-center items-center w-full h-full bg-main-background">
      <div className="loading-spinner"></div>
    </main>
  ) : (
    children
  );
}
