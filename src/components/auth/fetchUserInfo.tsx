'use client';

import { ReactNode, useEffect, useState } from 'react';
import { fetchAuthenticationStatus } from '@/app/_state/auth/authSlice';
import { useRouter } from 'next/navigation';
import { fetchFriends } from '@/app/_state/friend/friendSlice';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { fetchFriendRequests } from '@/app/_state/friendRequest/friendRequestSlice';

export default function FetchUserInfo({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await dispatch(fetchAuthenticationStatus());

        if (!res.payload.valid) {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    const fetchFriendsAsync = async () => {
      try {
        await dispatch(fetchFriends());
      } catch (error) {
        console.error('Fetch friends failed:', error);
      }
    };

    const fetchFriendRequestsAsync = async () => {
      try {
        await dispatch(fetchFriendRequests());
      } catch (error) {
        console.error('Fetch friends failed:', error);
      }
    };

    checkAuth();
    fetchFriendsAsync();
    fetchFriendRequestsAsync();

    setLoading(false);
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  return loading ? (
    <main className="flex justify-center items-center w-full h-full bg-main-background">
      <div className="loading-spinner"></div>
    </main>
  ) : (
    children
  );
}
