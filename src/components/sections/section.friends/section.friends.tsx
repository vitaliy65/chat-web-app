'use client';
import SearchFriend from './searchFriend';
import Friend from './friend';
import { useAppSelector } from '@/app/_hooks/hooks';

export default function Friends() {
  const friends = useAppSelector((state) => state.friend.friends);

  return (
    <div className="overflow-hidden min-w-2xs">
      <SearchFriend />
      <ul
        className="friend_section_container bg-friends-background"
        aria-label="friends"
        role="list"
      >
        {/* Render the list of friends */}
        {friends.map((friend) => (
          <Friend key={friend.id} {...friend} />
        ))}
      </ul>
    </div>
  );
}
