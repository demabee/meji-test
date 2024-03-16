'use client'
import { useCallback, useEffect, useState } from 'react';
import { debounce } from '../helpers';

const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const limit = 5;

  const fetchUsers = useCallback(async () => {
    let startIndex = (currentPage - 1) * limit;
    let endIndex = startIndex + limit;
    try {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      let filteredUsers = data;
      if (searchQuery !== '') {
        startIndex = 1;
        endIndex = 5;
        filteredUsers = data.filter((user: User) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setUsers(filteredUsers);
        setCurrentPage(1);
        setTotalPages(Math.ceil(filteredUsers.length / limit));
        return;
      }
      setUsers(filteredUsers.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredUsers.length / limit));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 1000), [fetchUsers]);

  const fetchUser = useCallback(async (id: ID) => {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`);
      const data = await res.json();
      setSelectedUser(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [users]);

  const updateUser = useCallback(async (user: Partial<User>) => {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },

      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [users]);

  const searchFilter = useCallback(async (query: string) => {
    setSearchQuery(query);
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    debouncedFetchUsers();
  }, [currentPage, searchQuery]);

  return {
    users,
    selectedUser,
    fetchUsers,
    updateUser,
    fetchUser,
    loading,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    searchFilter
  }
};

export default useUsers;