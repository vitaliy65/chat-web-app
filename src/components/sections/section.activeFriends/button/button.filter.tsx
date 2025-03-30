import React, { ReactNode } from 'react';
import '@/style/section/activeFriends.css';

type ChannelsIconProps = {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

export default function AddFriendButton({
  children,
  isActive,
  onClick,
}: ChannelsIconProps) {
  return (
    <button
      className={`filter_button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
