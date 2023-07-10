import React, { useEffect, useState } from 'react';
import { useClient } from 'next/server-components';
import PhotoGallery from './PhotoGallery'; 

const Home = () => {
  const client = useClient();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [client]);

  useEffect(() => {
    console.log('Follow state changed:', users);
  }, [users]);

  const handleFollow = (userId) => {
    // checking if the user is already followed
    const isFollowed = users.find((user) => user.id === userId).followed;

    if (isFollowed) {
      // to unfollow
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return { ...user, followed: false };
        }
        return user;
      });
      setUsers(updatedUsers);
      console.log(`Unfollow user with ID: ${userId}`);
    } else {
      // to follow the user
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return { ...user, followed: true };
        }
        return user;
      });
      setUsers(updatedUsers);
      console.log(`Follow user with ID: ${userId}`);
    }
  };

  if (!users.length) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>This is some existing content.</p>
      <p>This is the new content I want to add.</p>

      {/* Add the PhotoGallery component here */}
      <PhotoGallery />

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {users.map((user) => (
          <div
            key={user.id}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {user.name}{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Email: {user.email}</p>
            <button
              onClick={() => handleFollow(user.id)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </main>
  );

};

export default Home;