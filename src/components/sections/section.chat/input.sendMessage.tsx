'use client';

import { useAppDispatch } from '@/app/_hooks/hooks';
import { Message, sendMessageToChat } from '@/app/_state/chat/chatSlice';
import { socket } from '@/app/socket';
import Image from 'next/image';
import React, { useState } from 'react';

export default function SendMessage({
  friendId,
  chatId,
}: {
  friendId: string;
  chatId: string;
}) {
  const dispatch = useAppDispatch();
  const [messageContent, setmessageContent] = useState<string>('');

  const sendMessage = async () => {
    if (messageContent !== '') {
      const res = await dispatch(
        sendMessageToChat({ chatId: chatId, content: messageContent })
      );

      const data = res.payload as { chatId: string; message: Message };
      socket.volatile.emit('sendMessage', friendId, data.message);
    }
    setmessageContent('');
  };

  return (
    <div className="send_message_container">
      <input
        type="text"
        id="message"
        name="message"
        className="send_message_input bg-friend-list-background"
        placeholder="написать"
        value={messageContent}
        onChange={(e) => setmessageContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Запобігаємо введенню пробілу
            sendMessage(); // Відправляємо повідомлення
          }
        }}
        required
      />
      <button
        className="send-button bg-friends-background hover:bg-main-background"
        onClick={sendMessage}
      >
        <Image src={'/channels/send.png'} alt="send" width={128} height={128} />
      </button>
    </div>
  );
}
