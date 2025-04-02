'use client';

import Upper from './upper';
import ChatHistory from './chatHistory';
import SendMessage from './input.sendMessage';
import LeftSideBar from './bar.leftSideBar';
import { Suspense, useEffect, useState } from 'react';
import LoadingChat from './loading.Chat';
import { useAppDispatch, useAppSelector } from '@/app/_hooks/hooks';
import { AuthUser } from '@/utils/constants';
import { FriendType } from '@/app/_state/friend/friendSlice';
import { setCurrentChatByFriendId } from '@/app/_state/chat/chatSlice';

export default function Chat({ friendId }: { friendId: string }) {
  const currentChat = useAppSelector((state) => state.chat.currentChat);
  const friends = useAppSelector((state) => state.friend.friends);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [friend, setFriend] = useState<FriendType | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Set current chat
        await dispatch(setCurrentChatByFriendId(friendId));

        // Get user from localStorage
        const userString = localStorage.getItem('user');
        if (!userString) throw new Error('No user data found');
        const data = JSON.parse(userString);
        setUser(data.user);

        // Find friend after chat is updated
        const currentFriend = friends.find((f) => f.id === friendId);
        if (currentFriend) {
          setFriend(currentFriend);
        }
      } catch (error) {
        console.error('Error loading chat:', error);
      }
    };

    if (friendId) {
      fetchUser();
    }
  }, [dispatch, friendId, friends]);

  if (!friend || !user) {
    return <LoadingChat />; // или другая заглушка, если требуется
  }

  return (
    <>
      <Upper />
      <div className="flex flex-row justify-between h-full w-full">
        <div className="flex flex-col w-full h-full">
          <Suspense fallback={<LoadingChat />}></Suspense>
          <ChatHistory currentChat={currentChat} user={user} friend={friend} />
          <SendMessage chatId={currentChat.id} />
        </div>
        <LeftSideBar />
      </div>
    </>
  );
}
