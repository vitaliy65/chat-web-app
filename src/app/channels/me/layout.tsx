'use client';

import { ReactNode, Suspense } from 'react';
import Friends from '@/components/sections/section.friends/section.friends';
import AuthCheck from '@/components/auth/authCheck';
import Channels from '@/components/sections/section.leftSideChannels/section.leftsideChannels';
import Loading from '@/app/loading';

export default function ChannelsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AuthCheck>
      <Suspense fallback={<Loading />}>
        <Channels />
        <Friends />
        <main className="flex flex-col w-full bg-main-background">
          {children}
        </main>
      </Suspense>
    </AuthCheck>
  );
}
