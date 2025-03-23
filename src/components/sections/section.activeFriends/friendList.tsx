import React from 'react';
import FriendListItem from './friendListItem';

export default function FriendList() {
  return (
    <div className="friend-list-container">
      <p>Всего друзей: 999</p>
      <div className="flex flex-col w-full">
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
        <FriendListItem img="/friend/user.png">temp username</FriendListItem>
      </div>
    </div>
  );
}
