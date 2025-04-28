'use client';

import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import ActiveFriends from '../../../components/sections/section.activeFriends/section.activeFriends';
import { useAppDispatch } from '../../_hooks/hooks';
import { updateOnlineStatus } from '../../_state/user/userSlice';

export default function Default() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    async function onConnect() {
      await dispatch(updateOnlineStatus(true));
    }

    async function onDisconnect() {
      await dispatch(updateOnlineStatus(false));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Cleanup event listeners
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return <ActiveFriends />;
}
