import Image from 'next/image';
import React, { ReactNode } from 'react';

type FriendProps = {
  img: string;
  children: ReactNode;
};

export default function FriendListItem({ img, children }: FriendProps) {
  return (
    <div className="list-item-upperline">
      <div className="friend-list-item-container hover:bg-friend-list-bacground">
        <div className="row-center">
          <div className="friend_image_container">
            <Image
              className="friend_img"
              src={img}
              alt="friend img"
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
          <div>
            <p>{children}</p>
            <p className="online-status text-main-text">в сети</p>
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
