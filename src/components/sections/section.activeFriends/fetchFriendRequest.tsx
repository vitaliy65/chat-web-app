import { useAppDispatch, useAppSelector } from '@/app/_hooks/hooks';
import React from 'react';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';
import { fetchFriendRequests } from '@/app/_state/friendRequest/friendRequestSlice';

type FriendRequest = {
  requestId: string;
  senderName: string;
  status: 'pending' | 'accepted' | 'declined';
};

export default function FetchFriendRequest() {
  const requests: FriendRequest[] = useAppSelector(
    (state) => state.friendRequest.request
  );
  const dispatch = useAppDispatch();

  async function acceptFriendRequest(friendRequestId: string) {
    try {
      const data = JSON.parse(localStorage.getItem('user') || '{}');
      await axios.post(
        `${APP_URL}/api/acceptFriendRequest`,
        {
          id: data.user.id,
          friendRequestId: friendRequestId,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      await dispatch(fetchFriendRequests());
    } catch {
      console.log('Error accepting friend request');
    }
  }

  async function rejectFriendRequest(friendRequestId: string) {
    try {
      const data = JSON.parse(localStorage.getItem('user') || '{}');
      await axios.post(`${APP_URL}/api/friendRequestId/id/${friendRequestId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      await dispatch(fetchFriendRequests());
    } catch {
      console.log('Error rejecting friend request');
    }
  }

  return requests.length > 0 ? (
    <>
      <p>Запросы в друзья:</p>
      <div className="friend-list-container">
        {requests
          .filter((request) => request.status === 'pending')
          .map((request) => (
            <div key={request.requestId} className="flex flex-col w-full">
              <div className="list-item-upperline">
                <div className="friend-list-item-container border mb-2 hover:bg-friend-list-background">
                  <p className="friend_username">@{request.senderName}</p>
                  <div className="flex">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        acceptFriendRequest(request.requestId);
                      }}
                    >
                      Принять
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        rejectFriendRequest(request.requestId);
                      }}
                    >
                      Отклонить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  ) : null;
}
