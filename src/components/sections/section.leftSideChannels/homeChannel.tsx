import React from 'react';
import Image from 'next/image';
import * as motion from 'motion/react-client';

import '@/style/section/channels.css';

type ChannelsIconProps = {
  isActive: boolean;
  onClick: () => void;
};

export default function Home({ isActive, onClick }: ChannelsIconProps) {
  return (
    <>
      <motion.button
        initial={{ borderRadius: '32px' }}
        animate={{ borderRadius: isActive ? '12px' : '32px' }}
        whileHover={{ borderRadius: '12px' }}
        transition={{ duration: 0.3 }}
        className="channel_button_img bg-friends"
        onClick={onClick}
      >
        <Image
          className="h-8 w-8"
          src="/channels/me.png"
          alt="channelsIcon"
          width={128}
          height={128}
          objectFit="cover"
        />
      </motion.button>

      <hr className="me_channel_underline text-friends" />
    </>
  );
}
