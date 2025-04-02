import React from 'react';
import Image from 'next/image';
import { FriendType } from '@/app/_state/friend/friendSlice';

import '@/style/section/friend.css';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { setCurrentChatByFriendId } from '@/app/_state/chat/chatSlice';

//export default function Friend({user}: {user: FriendProps})
export default function Friend({
  id,
  username,
  avatar,
  onlineStatus,
  //channels,
}: FriendType) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpenChat = async () => {
    await dispatch(setCurrentChatByFriendId(id));
    router.push(`/channels/me/${id}`);
  };

  return (
    <li className="w-full">
      <button className="friend_button" onClick={handleOpenChat}>
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
