'use client';
import React from 'react';
import FillterFriends from './filterFriends';
import FriendList from './friendList';

export default function ActiveFriends() {
  return (
    <>
      <FillterFriends />
      <FriendList />
    </>
  );
}
