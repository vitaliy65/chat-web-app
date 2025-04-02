'use client';

import React from 'react';
import Image from 'next/image';
import { AuthUser } from '@/utils/constants';
import { ICurrentChat } from '@/app/_state/chat/chatSlice';
import { FriendType } from '@/app/_state/friend/friendSlice';

export default function ChatHistory({
  user,
  friend,
  currentChat,
}: {
  user: AuthUser;
  friend: FriendType;
  currentChat: ICurrentChat;
}) {
  return (
    <ul className="chat_container">
      {currentChat.messages.map((msg, index) => {
        const isSameSenderAsPrevious =
          index > 0 && currentChat.messages[index - 1].sender === msg.sender;

        return (
          <>
            {!isSameSenderAsPrevious && (
              <li
                key={'header-' + msg._id}
                className={`chat-item-container ${friend.id === msg.sender ? 'justify-start' : 'justify-end'} `}
              >
                <div key={'avatar-' + msg._id} className="chat-image-container">
                  <Image
                    src={
                      friend.id === msg.sender
                        ? friend.avatar
                        : user.avatar || '/friend/user.png'
                    }
                    alt="friend image"
                    width={128}
                    height={128}
                    className="h-8 w-8"
                  />
                </div>
                <div
                  key={'user-info-' + msg._id}
                  className={`message_container ${friend.id === msg.sender ? 'text-left justify-start pl-18' : 'text-right justify-end pr-18'}`}
                >
                  <span className={`user-name `}>
                    {friend.id === msg.sender ? friend.username : user.username}
                  </span>
                  <span
                    className={`message-send-time ${friend.id === msg.sender ? 'w-full' : 'w-fit'}`}
                  >
                    {`${new Date(msg.timestamp).toLocaleDateString()}, ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  </span>
                </div>
              </li>
            )}
            <li
              key={'message-' + msg._id}
              className={`chat-item-container ${friend.id === msg.sender ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`message_container ${friend.id === msg.sender ? 'justify-start pl-18' : 'justify-end pr-18'}`}
              >
                <span className={`bg-friend-list-background message text-left`}>
                  {msg.content}
                </span>
              </div>
            </li>
          </>
        );
      })}
    </ul>
  );
}
