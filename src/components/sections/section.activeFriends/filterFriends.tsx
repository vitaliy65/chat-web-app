'use client';

import React, { useState } from 'react';
import '@/style/section/activeFriends.css';
import FilterButton from './filterButton';
import AddFriendButton from './addFriendButton';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { AppDispatch } from '@/app/_state/store';
import {
  setShowAll,
  setShowOnline,
  setShowPending,
  setOpenAddFriendForm,
} from '@/app/_state/filterFriend/filterFriendSlice';

export default function FillterFriends() {
  const [activeIndex, setActiveIndex] = useState<number | null>(2);
  const dispatch = useAppDispatch();

  const action = async (
    index: number,
    actionFunction: () => ReturnType<AppDispatch>
  ) => {
    setActiveIndex(index);
    await dispatch(actionFunction());
  };

  return (
    <div className="filter_friend_container bg-main-background">
      <span>Друзья</span>
      <div className="w-[1px] h-full bg-main-text"></div>
      <FilterButton
        isActive={activeIndex == 1}
        onClick={() => action(1, setShowOnline)}
      >
        В сети
      </FilterButton>
      <FilterButton
        isActive={activeIndex == 2}
        onClick={() => action(2, setShowAll)}
      >
        Все
      </FilterButton>
      <FilterButton
        isActive={activeIndex == 3}
        onClick={() => action(3, setShowPending)}
      >
        Ожидание
      </FilterButton>
      <AddFriendButton onClick={() => action(4, setOpenAddFriendForm)}>
        Добавить в друзья
      </AddFriendButton>
    </div>
  );
}
