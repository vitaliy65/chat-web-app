'use client';

import React, { useState } from 'react';
import '@/style/section/activeFriends.css';
import FilterButton from './filterButton';
import AddFriendButton from './addFriendButton';

export default function FillterFriends() {
  const [activeIndex, setActiveIndex] = useState<number | null>(2);

  const handleIconClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="filter_friend_container bg-main-background">
      <span>Друзья</span>
      <div className="w-[1px] h-full bg-main-text"></div>
      <FilterButton
        isActive={activeIndex == 1}
        onClick={() => handleIconClick(1)}
      >
        В сети
      </FilterButton>
      <FilterButton
        isActive={activeIndex == 2}
        onClick={() => handleIconClick(2)}
      >
        Все
      </FilterButton>
      <FilterButton
        isActive={activeIndex == 3}
        onClick={() => handleIconClick(3)}
      >
        Ожидание
      </FilterButton>
      <AddFriendButton
        isActive={activeIndex == 4}
        onClick={() => handleIconClick(4)}
      >
        Добавить в друзья
      </AddFriendButton>
    </div>
  );
}
