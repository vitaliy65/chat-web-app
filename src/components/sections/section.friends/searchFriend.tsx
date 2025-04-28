import React from 'react';
import '@/style/section/friend.css';

export default function SearchFriend() {
  return (
    <div className="search_friend_container bg-friends">
      <input
        className="search_friend_input bg-channels"
        type="text"
        placeholder="Найти друга"
      />
    </div>
  );
}
