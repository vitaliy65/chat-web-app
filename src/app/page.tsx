'use client';
import ActiveFriends from '@/components/sections/section.activeFriends/section.activeFriends';
import Friends from '@/components/sections/section.friends/section.friends';
import AuthCheck from '@/components/auth/authCheck';
import Channels from '@/components/sections/section.leftSideChannels/section.leftsideChannels';

export default function Home() {
  return (
    <AuthCheck>
      <Channels />
      <Friends />
      <main className="flex flex-col w-full bg-main-background">
        <ActiveFriends />
      </main>
    </AuthCheck>
  );
}
