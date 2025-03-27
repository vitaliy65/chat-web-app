import React from 'react';
import FriendListItem from './friendListItem';
import { useAppSelector } from '@/app/_hooks/hooks';
import { FriendType } from '@/app/_state/friend/friendSlice';
import FetchFriendRequest from './fetchFriendRequest';
import AddFriendForm from './addFriendForm';

export default function FriendList() {
  const friends: FriendType[] = useAppSelector((state) => state.friend.friends);
  const action = useAppSelector((state) => state.filterFriend.action);

  return (
    <div className="friend-list-container">
      <p>Всего друзей: {friends.length}</p>
      <div className="flex flex-col w-full">
        {action.showAll &&
          friends.map((friend) => (
            <FriendListItem key={friend.id} {...friend} />
          ))}
        {action.showOnline &&
          friends
            .filter((friend) => friend.onlineStatus === 'online')
            .map((friend) => <FriendListItem key={friend.id} {...friend} />)}
        {action.showPending && <FetchFriendRequest />}
        {action.openAddFriendForm && <AddFriendForm />}
      </div>
    </div>
  );
}
