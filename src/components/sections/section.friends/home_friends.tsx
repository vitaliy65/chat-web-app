import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FriendsHome() {
  return (
    <li className="w-full">
      <Link href={'/channels/me'} className="friend_button">
        <Image
          className="h-8 w-8 pl-1 pt-1"
          src={'/friend/friends.png'}
          alt="friends"
          width={128}
          height={128}
        />
        <p className="friend_username">Друзья</p>
      </Link>
    </li>
  );
}
