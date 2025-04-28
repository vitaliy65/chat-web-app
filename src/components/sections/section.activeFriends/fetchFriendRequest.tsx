import { useAppDispatch, useAppSelector } from '@/app/_hooks/hooks';
import React from 'react';
import {
  fetchFriendRequests,
  acceptFriendRequest,
  denyFriendRequest,
  FriendRequest,
} from '@/app/_state/friendRequest/friendRequestSlice';
import { updateUserInfo } from '@/app/_state/user/userSlice';
import { fetchFriends } from '@/app/_state/friend/friendSlice';
import { createChat, fetchChats } from '@/app/_state/chat/chatSlice';

export default function FetchFriendRequest() {
  const requests: FriendRequest[] = useAppSelector(
    (state) => state.friendRequest.request
  );
  const dispatch = useAppDispatch();

  async function _acceptFriendRequest(
    friendRequestId: string,
    friendId: string
  ) {
    try {
      await dispatch(acceptFriendRequest(friendRequestId));
      await dispatch(fetchFriendRequests());
      await dispatch(fetchFriends());
      await dispatch(createChat(friendId));
      await dispatch(updateUserInfo());
    } catch {
      console.log('Error accepting friend request');
    }
  }

  async function _rejectFriendRequest(friendRequestId: string) {
    try {
      await dispatch(denyFriendRequest(friendRequestId));
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
                <div className="friend-list-item-container border border-stone-600 mb-2 hover:bg-friend_list_bg">
                  <p className="friend_username">@{request.senderName}</p>
                  <div className="flex">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        _acceptFriendRequest(
                          request.requestId,
                          request.senderId
                        );
                      }}
                    >
                      Принять
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        _rejectFriendRequest(request.requestId);
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
