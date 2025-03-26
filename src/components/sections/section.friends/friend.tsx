import React from 'react';
import Image from 'next/image';
import { FriendType } from '@/app/_state/friend/friendSlice';

import '@/style/section/friend.css';

//export default function Friend({user}: {user: FriendProps})
export default function Friend({
  username,
  avatar,
  onlineStatus,
  //channels,
}: FriendType) {
  return (
    <li className="w-full">
      <button className="friend_button">
        <div className="friend_image_container">
          <Image
            className="friend_img"
            src={avatar ? avatar : '/friend/user.png'}
            alt=""
            width={128}
            height={128}
          />
          <Image
            className="friend_online_status"
            src={
              onlineStatus
                ? '/user/active user.png'
                : '/user/not active user.png'
            }
            alt=""
            width={128}
            height={128}
          />
        </div>
        <p className="friend_username">{username}</p>
      </button>
    </li>
  );
}
