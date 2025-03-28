import Image from 'next/image';
import React from 'react';
import { FriendType } from '@/app/_state/friend/friendSlice';

export default function FriendListItem({
  username,
  avatar,
  onlineStatus,
  //channels,
}: FriendType) {
  return (
    <div className="list-item-upperline">
      <div className="friend-list-item-container hover:bg-friend-list-background">
        <div className="row-center">
          <div className="friend_image_container">
            <Image
              className="friend_img"
              src={avatar ? avatar : '/friend/user.png'}
              alt="friend img"
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
          <div>
            <p>{username}</p>
            <p className="online-status text-main-text">
              {onlineStatus ? 'в сети' : 'не в сети'}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <button className="additional-buttons bg-friends-background hover:bg-channels-background">
            <Image
              src={'/friend/email.png'}
              alt="send message"
              width={128}
              height={128}
              className="additional-image-container"
            ></Image>
          </button>
          <button className="additional-buttons bg-friends-background hover:bg-channels-background">
            <Image
              src={'/friend/more.png'}
              alt="send message"
              width={128}
              height={128}
              className="additional-image-container"
            ></Image>
          </button>
        </div>
      </div>
    </div>
  );
}
