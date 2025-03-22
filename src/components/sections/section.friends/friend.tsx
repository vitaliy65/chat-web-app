import React from 'react';
import Image from 'next/image';

import '@/style/section/friend.css';

// type FriendProps = {
//   img: string
//   username: string
//   active: boolean
// }

//export default function Friend({user}: {user: FriendProps})
export default function Friend() {
  return (
    <li className="w-full">
      <button className="friend_button">
        <div className="friend_image_container">
          <Image
            className="friend_img"
            src={'/friend/user.png'}
            alt=""
            width={128}
            height={128}
          />
          <Image
            className="friend_online_status"
            src={'/user/active user.png'}
            alt=""
            width={128}
            height={128}
          />
        </div>
        <p className="friend_username">username username username</p>
      </button>
    </li>
  );
}
