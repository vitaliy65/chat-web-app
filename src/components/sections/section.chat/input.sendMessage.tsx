'use client';

import React, { useState } from 'react';

export default function SendMessage() {
  const [messageContent, setmessageContent] = useState<string>('');

  return (
    <div className="send_message_container">
      <input
        type="text"
        id="message"
        name="message"
        className="mt-1 block w-full px-4 py-2 border border-stone-600 bg-friend-list-background focus:border-stone-500 focus:outline-none rounded-md shadow-sm "
        placeholder="написать"
        onChange={(e) => setmessageContent(e.target.value)}
        required
      />
    </div>
  );
}
