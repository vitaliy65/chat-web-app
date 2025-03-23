import ActiveFriends from '@/components/sections/section.activeFriends/section.activeFriends';
import Channels from '@/components/sections/section.leftSideChannels/section.leftsideChannels';
import Friends from '@/components/sections/section.friends/section.friends';

export default function Home() {
  return (
    <>
      <Channels />
      <Friends />
      <main className="flex flex-col w-full bg-main-background">
        <ActiveFriends />
      </main>
    </>
  );
}
