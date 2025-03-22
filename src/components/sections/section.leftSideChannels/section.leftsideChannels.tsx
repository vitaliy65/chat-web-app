'use client';

import React, { useState } from 'react';
import ChannelsIcon from './channelsIcon';
import MeIcon from './meIcon';

import '@/style/section/channels.css';

export default function Channels() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleIconClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    // generate channels that user are in
    <div className="channel_section_container bg-channels-background">
      <MeIcon
        isActive={activeIndex === -1}
        onClick={() => handleIconClick(-1)}
      />
      {[...Array(6)].map((_, index) => (
        <ChannelsIcon
          key={index}
          isActive={activeIndex === index}
          onClick={() => handleIconClick(index)}
        />
      ))}
    </div>
  );
}
