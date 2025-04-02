'use client';

import { useAppDispatch } from '@/app/_hooks/hooks';
import { sendMessageToChat } from '@/app/_state/chat/chatSlice';
import Image from 'next/image';
import React, { useState } from 'react';

export default function SendMessage({ chatId }: { chatId: string }) {
  const dispatch = useAppDispatch();
  const [messageContent, setmessageContent] = useState<string>('');

  const sendMessage = async () => {
    console.log({ chatId, messageContent });
    if (messageContent !== '')
      await dispatch(
        sendMessageToChat({ chatId: chatId, content: messageContent })
      );
    setmessageContent('');
  };

  return (
    <div className="send_message_container">
      <input
        type="text"
        id="message"
        name="message"
        className="mt-1 block w-full px-4 py-2 border border-stone-600 bg-friend-list-background focus:border-stone-500 focus:outline-none rounded-md shadow-sm "
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
