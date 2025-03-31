'use client';
import { useAppSelector } from '@/app/_hooks/hooks';
import { FriendType } from '@/app/_state/friend/friendSlice';
import { AuthUser } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ChatHistory() {
  const currentChat = useAppSelector((state) => state.chat.currentChat);
  const friends = useAppSelector((state) => state.friend.friends);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [friend, setFriend] = useState<FriendType | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user') || '');
    setUser(data.user);

    const currentFriend = friends.findLast(
      (f) => f.id === currentChat.friendId
    );
    if (currentFriend) setFriend(currentFriend);
  }, [friend?.id]);

  if (!friend || !user) {
    return null; // или другая заглушка, если требуется
  }

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
                <div key={'user-info-' + msg._id} className="message_container">
                  <span
                    className={`user-name ${friend.id === msg.sender ? 'text-left' : 'text-right'}`}
                  >
                    {friend.id === msg.sender ? friend.username : user.username}
                  </span>
                  <span
                    className={`message-send-time ${friend.id === msg.sender ? 'text-left' : 'text-right'}`}
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
              <div className="message_container">
                <span
                  className={`message ${friend.id === msg.sender ? 'text-left' : 'text-right'}`}
                >
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
