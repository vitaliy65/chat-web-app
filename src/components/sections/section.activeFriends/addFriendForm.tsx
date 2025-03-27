import React from 'react';
import Image from 'next/image';
import { setOpenAddFriendForm } from '@/app/_state/filterFriend/filterFriendSlice';
import { useAppDispatch } from '@/app/_hooks/hooks';

export default function AddFriendForm() {
  const dispatch = useAppDispatch();

  const closeForm = () => {
    dispatch(setOpenAddFriendForm());
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={closeForm}
    >
      <div
        className="bg-main-background p-6 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="justify-between flex items-center mb-4">
          <h2 className="text-xl font-bold">Добавить друга</h2>
          <button className="w-6 h-6 cursor-pointer p-1 border rounded-sm">
            <Image
              src={'/form/close.png'}
              alt="close"
              width={128}
              height={128}
              onClick={closeForm}
            />
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="friendName" className="block text-sm font-medium">
              Имя друга
            </label>
            <input
              type="text"
              id="friendName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите имя друга"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
}
