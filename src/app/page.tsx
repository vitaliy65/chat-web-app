'use client';

import ActiveFriends from '@/components/sections/section.activeFriends/section.activeFriends';
import Channels from '@/components/sections/section.leftSideChannels/section.leftsideChannels';
import Friends from '@/components/sections/section.friends/section.friends';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean | null>(null); // Добавлен `null`, чтобы избежать мгновенного редиректа

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      setAuth(userData ? true : false);
    } catch {
      console.error('Error reading user data from localStorage');
      setAuth(false);
    }
  }, []);

  useEffect(() => {
    if (auth === false) {
      router.push('/auth/login');
    }
  }, [auth, router]);

  return (
    <>
      {auth ? (
        <>
          <Channels />
          <Friends />
          <main className="flex flex-col w-full bg-main-background">
            <ActiveFriends />
          </main>
        </>
      ) : (
        <main className="flex justify-center items-center w-full h-full bg-main-background"></main>
      )}
    </>
  );
}
