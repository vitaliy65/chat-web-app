import React from 'react';
import Image from 'next/image';
import * as motion from 'motion/react-client';

import '@/style/section/channels.css';

type ChannelsIconProps = {
  isActive: boolean;
  onClick: () => void;
};

export default function ChannelsIcon({ isActive, onClick }: ChannelsIconProps) {
  return (
    <motion.button
      initial={{ borderRadius: '32px' }}
      animate={{ borderRadius: isActive ? '12px' : '32px' }}
      whileHover={{ borderRadius: '12px' }}
      transition={{ duration: 0.3 }}
      className="channel_button_img bg-friends"
      onClick={onClick}
    >
      <Image
        src="/channels/chat.png"
        alt="channelsIcon"
        width={128}
        height={128}
      />
    </motion.button>
  );
}
