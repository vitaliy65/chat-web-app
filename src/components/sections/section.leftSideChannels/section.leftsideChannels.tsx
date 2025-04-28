'use client';

import React, { useState } from 'react';
import ChannelsIcon from './channelsIcon';
import Home from './homeChannel';

import '@/style/section/channels.css';
import AddChannel from './addChannel';

export default function Channels() {
  const [activeIndex, setActiveIndex] = useState<number | null>(-1);

  const handleIconClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    // generate channels that user are in
    <div className="channel_section_container bg-channels">
      <Home isActive={activeIndex === -1} onClick={() => handleIconClick(-1)} />
      {[...Array(6)].map((_, index) => (
        <ChannelsIcon
          key={index}
          isActive={activeIndex === index}
          onClick={() => handleIconClick(index)}
        />
      ))}
      <AddChannel
        isActive={activeIndex === -2}
        onClick={() => handleIconClick(-2)}
      />
    </div>
  );
}
