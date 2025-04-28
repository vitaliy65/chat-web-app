'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FriendType } from '@/app/_state/friend/friendSlice';
import MoreActionButton from './button/button.moreAction';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { deleteFriend } from '@/app/_state/friend/friendSlice';
import { updateUserInfo } from '@/app/_state/user/userSlice';
import {
  deleteChat,
  setCurrentChatByFriendId,
} from '@/app/_state/chat/chatSlice';
import { useRouter } from 'next/navigation';

export default function FriendListItem({
  id,
  username,
  avatar,
  onlineStatus,
  //channels,
}: FriendType) {
  const [showMoreActions, useShowMoreActions] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const router = useRouter();

  const handleOpenChat = async () => {
    await dispatch(setCurrentChatByFriendId(id));
    router.push(`/channels/me/${id}`);
  };

  const moreActions = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth || 0;
    const windowHeight = window.innerHeight || 0;

    const divWidth = 200; // Пример ширины div
    const divHeight = 100; // Пример высоты div

    // Рассчитываем позицию, чтобы не выйти за границы окна
    const x = Math.min(clientX, windowWidth - divWidth);
    const y = Math.min(clientY, windowHeight - divHeight);

    setPosition({ x, y });
    useShowMoreActions(!showMoreActions);
  };

  const handle_delete_and_close_MoreActionsForm = async () => {
    await dispatch(deleteFriend(id));
    await dispatch(deleteChat(id));
    await dispatch(updateUserInfo());
    useShowMoreActions(false);
  };

  return (
    <div className="list-item-upperline" onClick={handleOpenChat}>
      <div className="friend-list-item-container cursor-pointer hover:bg-friend_list_bg">
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
            <p className="online-status text-mainText">
              {onlineStatus ? 'в сети' : 'не в сети'}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          {/* send message button */}
          <button
            className="additional-buttons bg-friends hover:bg-channels"
            onClick={handleOpenChat}
          >
            <Image
              src={'/friend/email.png'}
              alt="send message"
              width={128}
              height={128}
              className="additional-image-container"
            ></Image>
          </button>

          {/* more actions button */}
          <button
            className="additional-buttons bg-friends hover:bg-channels"
            onClick={moreActions}
          >
            {showMoreActions && position ? (
              <MoreActionButton
                onClick={handle_delete_and_close_MoreActionsForm}
                position={position}
              />
            ) : (
              ''
            )}
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
