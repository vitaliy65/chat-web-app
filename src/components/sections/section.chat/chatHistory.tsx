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
          <li key={msg._id}>
            {!isSameSenderAsPrevious && (
              <div
                className={`chat-item-container ${friend.id === msg.sender ? 'justify-start' : 'justify-end'} `}
              >
                {friend.id === msg.sender && (
                  <div className="chat-image-container">
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
                )}
                <div
                  className={`message_container ${friend.id === msg.sender ? 'text-left justify-start ' : 'text-right justify-end'}`}
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
                {friend.id !== msg.sender && (
                  <div className="chat-image-container">
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
                )}
              </div>
            )}
            <div
              className={`chat-item-container ${friend.id === msg.sender ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`message_container ${friend.id === msg.sender ? 'justify-start pl-18' : 'justify-end pr-18'}`}
              >
                <span className={`bg-friend_list_bg message text-left`}>
                  {msg.content}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
