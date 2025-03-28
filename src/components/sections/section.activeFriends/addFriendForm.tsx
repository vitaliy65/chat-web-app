import React, { useEffect } from 'react';
import Image from 'next/image';
import { setOpenAddFriendForm } from '@/app/_state/filterFriend/filterFriendSlice';
import { useAppDispatch } from '@/app/_hooks/hooks';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';
import { motion } from 'framer-motion';

export default function AddFriendForm() {
  const dispatch = useAppDispatch();
  const [friendName, setFriendName] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowErrorModal(false);
    }, 2000);

    return clearTimeout(timer);
  }, [showErrorModal]);

  const closeForm = () => {
    dispatch(setOpenAddFriendForm());
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrorModal(true);
    try {
      const data = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await axios.post(
        `${APP_URL}/api/friendRequest/${friendName}`,
        {
          senderId: data.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (res.status === 201) {
        await dispatch(setOpenAddFriendForm());
      }
    } catch {
      setShowErrorModal(true);
    }
  };

  return (
    <div className="form-bg" onClick={closeForm}>
      <div
        className="form-bg-color bg-main-background"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="justify-between flex items-center mb-4">
          <h2 className="text-xl font-bold">Добавить друга</h2>
          <button className="close-button" onClick={closeForm}>
            <Image
              src={'/form/close.png'}
              alt="close"
              width={128}
              height={128}
            />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="friendName" className="block text-sm font-medium">
              Имя друга
            </label>
            <input
              type="text"
              id="friendName"
              name="friendName"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              className="add-friend-form-input-field"
              placeholder="Введите имя друга"
              required
            />
          </div>
          <button type="submit" className="add-friend-form-button">
            Добавить
          </button>
        </form>
        {showErrorModal && (
          <motion.div
            className="fixed top-0 right-0 z-10 w-2xs h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowErrorModal(false)}
          >
            <div className="p-4 shadow-lg text-center  rounded bg-red-500 text-white mt-3">
              Пользователя не найдено
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
