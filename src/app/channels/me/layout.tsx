'use client';

import { ReactNode, Suspense } from 'react';
import Friends from '@/components/sections/section.friends/section.friends';
import AuthCheck from '@/components/auth/authCheck';
import Channels from '@/components/sections/section.leftSideChannels/section.leftsideChannels';
import Loading from '@/app/loading';
import FetchUserInfo from '@/components/auth/fetchUserInfo';

export default function ChannelsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <FetchUserInfo>
      <AuthCheck>
        <Suspense fallback={<Loading />}>
          <Channels />
          <Friends />
          <main className="flex flex-col h-screen w-full bg-main-background">
            {children}
          </main>
        </Suspense>
      </AuthCheck>
    </FetchUserInfo>
  );
}
