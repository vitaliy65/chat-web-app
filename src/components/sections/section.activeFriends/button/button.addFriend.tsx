import React, { ReactNode } from 'react';
import '@/style/section/activeFriends.css';
import { useAppSelector } from '@/app/_hooks/hooks';

type ChannelsIconProps = {
  onClick: () => void;
  children: ReactNode;
};

export default function AddFriendButton({
  children,
  onClick,
}: ChannelsIconProps) {
  const active = useAppSelector(
    (state) => state.filterFriend.action.openAddFriendForm
  );
  return (
    <button
      className={`add_friend_button ${active ? 'active-add' : 'not-active-add'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
