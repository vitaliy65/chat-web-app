import React, { useEffect } from 'react';
import FriendListItem from './friendListItem';
import { useAppSelector } from '@/app/_hooks/hooks';
import { FriendType } from '@/app/_state/friend/friendSlice';

export default function FriendList() {
  const friends: FriendType[] = useAppSelector((state) => state.friend.friends);
  const action = useAppSelector((state) => state.filterFriend.action);

  useEffect(() => {
    console.log('FriendList action:', action);
  }, [action]);

  return (
    <div className="friend-list-container">
      <p>Всего друзей: {friends.length}</p>
      <div className="flex flex-col w-full">
        {friends.map((friend) => (
          <FriendListItem key={friend.id} {...friend} />
        ))}
      </div>
    </div>
  );
}
