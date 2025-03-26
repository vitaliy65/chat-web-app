import { useState, useEffect } from 'react';
import SearchFriend from './searchFriend';
import Friend from './friend';
import { fetchFriends } from '@/app/_state/friend/friendSlice';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { FriendType } from '@/app/_state/friend/friendSlice';

export default function Friends() {
  const [friends, setFriends] = useState<FriendType[]>([]); // Corrected type to FriendType[]
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchFriendsAsync = async () => {
      try {
        const res = await dispatch(fetchFriends());
        const friends = Array.isArray(res.payload) ? res.payload : [];
        await setFriends(friends);
      } catch (error) {
        console.error('Fetch friends failed:', error);
      }
    };

    fetchFriendsAsync();
  }, [dispatch]);

  return (
    <div className="overflow-hidden min-w-2xs">
      <SearchFriend />
      <ul
        className="friend_section_container bg-friends-background"
        aria-label="friends"
        role="list"
      >
        {/* Render the list of friends */}
        {friends.map((friend) => (
          <Friend key={friend.id} {...friend} />
        ))}
      </ul>
    </div>
  );
}

// useEffect(() => {
//   const fetchFriendsAsync = async () => {
//     const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const friendIds = storedUser?.user?.friends || [];

//     const link = `${APP_URL}/api/friend/${friendIds.join('/')}`;

//     // Fetch data for each friend
//     const friendData: FriendType[] = await axios
//       .get(link, {
//         headers: {
//           Authorization: `Bearer ${storedUser.token}`,
//         },
//       })
//       .then((res) => res.data)
//       .catch((err) => {
//         console.error(err);
//         return [];
//       });

//     // Filter out null values
//     setFriends(friendData.filter((friend: FriendType) => friend !== null));
//   };

//   fetchFriendsAsync();
// }, []);
