import { useAppSelector } from '@/app/_hooks/hooks';
import React, { useEffect, useState } from 'react';

interface moreActionProps {
  onClick: () => void;
  position: { x: number; y: number };
}

const MoreActionButton = ({ position, onClick }: moreActionProps) => {
  const friends = useAppSelector((state) => state.friend.friends);

  useEffect(() => {}, [friends]);

  return (
    <div className="absolute inset-0">
      <div
        className="absolute w-fit p-2 bg-friend-list-background border border-stone-500 rounded-md shadow-2xl"
        style={{
          top: position.y,
          left: position.x,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="text-red-400 hover:bg-red-400/8 rounded-md p-1 px-2"
          onClick={onClick}
        >
          Удалить из друзей
        </p>
      </div>
    </div>
  );
};

export default MoreActionButton;
