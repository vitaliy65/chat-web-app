// Ваш компонент Chat с учетом обновлений
import { useEffect, useState } from 'react';
import {
  addMessageToCurrentChat,
  fetchMessagesByChatId,
  Message,
  setCurrentChatByFriendId,
} from '@/app/_state/chat/chatSlice';
import { socket } from '@/app/socket';
import LoadingChat from './loading.Chat';
import ChatHistory from './chatHistory';
import SendMessage from './input.sendMessage';
import LeftSideBar from './bar.leftSideBar';
import Upper from './upper';
import { AuthUser } from '@/utils/constants';
import { FriendType } from '@/app/_state/friend/friendSlice';
import { useAppDispatch, useAppSelector } from '@/app/_hooks/hooks';

export default function Chat({ friendId }: { friendId: string }) {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector((state) => state.chat.currentChat);
  const friends = useAppSelector((state) => state.friend.friends);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [friend, setFriend] = useState<FriendType | null>(null);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        await dispatch(setCurrentChatByFriendId(friendId));

        const userString = localStorage.getItem('user');
        if (!userString) throw new Error('No user data found');
        const data = JSON.parse(userString);
        setUser(data.user);

        const currentFriend = friends.find((f) => f.id === friendId);
        if (currentFriend) {
          setFriend(currentFriend);
        }
      } catch (error) {
        console.error('Error loading chat:', error);
      }
    };

    if (friendId) {
      fetchChatUsers();
    }

    const handleMessage = (message: Message) => {
      dispatch(addMessageToCurrentChat(message));
    };

    socket.on('updateChat-' + user?.id, handleMessage);

    return () => {
      socket.off('updateChat-' + user?.id, handleMessage);
    };
  }, [dispatch, currentChat.id, user?.id, socket]);

  if (!friend || !user) {
    return <LoadingChat />;
  }

  return (
    <>
      <div className="flex flex-col justify-between w-full h-screen">
        <Upper />
        <div className="flex flex-row h-full">
          <div className="flex flex-col justify-between w-full">
            <ChatHistory
              currentChat={currentChat}
              user={user}
              friend={friend}
            />
            <SendMessage chatId={currentChat.id} friendId={friendId} />
          </div>
          <LeftSideBar />
        </div>
      </div>
    </>
  );
}
