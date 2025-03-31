'use client';
import { useAppSelector } from '@/app/_hooks/hooks';
import { FriendType } from '@/app/_state/friend/friendSlice';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Upper() {
  const currentChat = useAppSelector((state) => state.chat.currentChat); // Fixed typo
  const friends = useAppSelector((state) => state.friend.friends);
  const [friend, setFriend] = useState<FriendType | null>(null);

  useEffect(() => {
    const existingFriend = friends.findLast(
      (f) => f.id === currentChat?.friendId // Fixed typo and added optional chaining
    );
    if (existingFriend) setFriend(existingFriend);
  }, [friends, currentChat]);

  return (
    <div className="upper_chat_container bg-main-background">
      <div className="friend_image_container rounded-full overflow-hidden">
        <Image
          src={friend?.avatar || '/friend/user.png'}
          alt="friend image"
          width={128}
          height={128}
        />
        <Image
          className="friend_online_status"
          src={
            friend?.onlineStatus
              ? '/user/active user.png'
              : '/user/not active user.png'
          }
          alt=""
          width={128}
          height={128}
        />
      </div>
      <p>{friend?.username}</p>
    </div>
  );
}
