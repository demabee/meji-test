'use client'
import UserCard from './components/UserCard';
import useUsers from './hooks/useUsers';
import { useEffect } from 'react';
import Loading from './components/Loading';
import Icon from './components/Icon/Icon';
import TextInput from './components/Form/TextInput';

export default function Home() {
  const {
    users,
    loading,
    prevPage,
    nextPage,
    totalPages,
    currentPage,
    searchFilter
  } = useUsers();

  return (
    <>
      <div className="my-4">
        <TextInput
          label="Search User"
          onChange={(e) => searchFilter(e.target.value)}
        />
      </div>
      <h2 className="text-2xl font-bold">User Card Lists</h2>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2 gap-y-10 mt-8">
        {loading &&
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50 z-50">
            <Loading />
          </div>
        }
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            username={user.username}
            website={user.website}
            email={user.email}
            name={user.name}
            phone={user.phone}
            company={user.company}
            address={user.address}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-between">
        <button
          className="bg-black hover:bg-neutral-500 disabled:bg-neutral-500 rounded-full p-2"
          onClick={prevPage}
          disabled={users.length === 0 || currentPage === 1}
        >
          <Icon
            name="chevron_left"
            size={20}
            color="white"
          />
        </button>
        <button
          className="bg-black hover:bg-neutral-500 disabled:bg-neutral-500 rounded-full p-2"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <Icon
            name="chevron_right"
            size={20}
            color="white"
          />
        </button>
      </div>
    </>
  );
}