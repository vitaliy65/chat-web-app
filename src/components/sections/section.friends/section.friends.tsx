import React from 'react';
import Friend from './friend';
import SearchFriend from './searchFriend';

import '@/style/section/friend.css';

export default function Friends() {
  return (
    // generate channels that user are in
    <div className="overflow-hidden min-w-2xs">
      <SearchFriend />
      <ul
        className="friend_section_container bg-friends-background"
        area-label="friends"
        role="list"
      >
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </ul>
    </div>
  );
}
