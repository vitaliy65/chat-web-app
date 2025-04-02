'use client';

import Chat from '@/components/sections/section.chat/section.chat';
import { useParams } from 'next/navigation';
import React from 'react';

export default function FriendChat() {
  const params = useParams();
  const id = params.id; // Достаем параметр 'id' из URL\

  if (!id) {
    return null; // Обробка випадку, коли id відсутній
  }

  return <Chat friendId={id.toString()} />;
}
