import { useAppSelector } from '@/app/_hooks/hooks';
import React from 'react';

export default function FetchFriendRequest() {
  const senderNames: string[] = useAppSelector(
    (state) => state.friendRequest.senderNames
  );
  return senderNames.length > 0 ? (
    <div className="flex flex-col w-full">
      <p>Запросы в друзья:</p>
      {senderNames.map((name) => (
        <div key={name} className="flex justify-between">
          <p>{name}</p>
          <div className="flex">
            <button className="btn btn-primary">Принять</button>
            <button className="btn btn-secondary">Отклонить</button>
          </div>
        </div>
      ))}
    </div>
  ) : null;
}
