'use client';
import SearchFriend from './searchFriend';
import Friend from './friend';
import { useAppSelector } from '@/app/_hooks/hooks';
import FriendsHome from './home_friends';
import { FriendType } from '@/app/_state/friend/friendSlice';

export default function Friends() {
  const friends: FriendType[] = useAppSelector((state) => state.friend.friends);

  return (
    <div className="flex flex-col min-w-2xs h-screen">
      <SearchFriend />
      <ul
        className="friend_section_container bg-friends"
        aria-label="friends"
        role="list"
      >
        <FriendsHome />
        <hr className="w-full text-friend_list_bg"></hr>
        {/* Render the list of friends */}
        {friends.map((friend) => (
          <Friend key={friend.id} {...friend} />
        ))}
      </ul>
    </div>
  );
}
