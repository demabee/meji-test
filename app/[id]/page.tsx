'use client'
import React, { use, useEffect, useMemo, useState } from 'react'
import TextInput from '../components/Form/TextInput'
import Button from '../components/Button'
import Textarea from '../components/Form/TextArea'
import useUsers from '../hooks/useUsers'
import Loading from '../components/Loading'
import Image from 'next/image'
import { PREFIXES } from '../constants'

type UserDetailsProps = {
  params: {
    id: string
  }
}

const UserDetails: React.FC<UserDetailsProps> = ({ params }) => {
  const { id } = params;
  const { selectedUser, fetchUser, updateUser, loading } = useUsers();
  const [form, setForm] = useState({
    id: selectedUser?.id,
    name: selectedUser?.name,
    username: selectedUser?.username,
    email: selectedUser?.email
  })
  const address = useMemo(() => {
    return `${selectedUser?.address?.suite} ${selectedUser?.address?.street} ${selectedUser?.address?.city} ${selectedUser?.address?.zipcode}`;
  }, [selectedUser]);

  const imageLoader = () => {
    const modifiedName = selectedUser?.name
      .split(' ')
      .filter(word => word.length > 1 && !PREFIXES.includes(word))
      .map((word) => word.charAt(0))
      .join('');

    return `https://placehold.co/180x180/5172e9/white?text=${modifiedName}`
  };

  const onUpdate = async () => {
    const res = await updateUser(form);
    alert(`Successfully updated user ${res.name}`);
  };

  const onUpdateForm = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    fetchUser(parseInt(id));
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      id: selectedUser?.id,
      name: selectedUser?.name,
      username: selectedUser?.username,
      email: selectedUser?.email
    }));
  }, [selectedUser]);

  return (
    <>
      {loading && selectedUser !== null ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50 z-50">
          <Loading />
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-2xl font-bold">User Details for @<span className="underline">{selectedUser?.username}</span></p>
          <div className="relative flex gap-16 mt-8">
            <div className="relative" style={{ height: '140px', width: '180px' }}>
              <Image
                loader={imageLoader}
                src={`https://placehold.co/180x180/5172e9/white?text=${selectedUser?.name}`}
                layout="fill"
                alt="Meji"
              />
            </div>
            <div className="flex flex-col w-1/2 px-5 space-y-4">
              <TextInput
                defaultValue={form?.name}
                onChange={(e) => onUpdateForm('name', e.target.value)}
                // value={selectedUser?.name}
                label="Name"
                placeholder="Name"
                type="text"
              />
              <TextInput
                defaultValue={form?.email}
                onChange={(e) => onUpdateForm('email', e.target.value)}
                // value={selectedUser?.email}
                label="Email Address"
                placeholder="Email Address"
                type="email"
              />
              <TextInput
                onChange={(e) => onUpdateForm('username', e.target.value)}
                defaultValue={form?.username}
                // value={selectedUser?.username}
                label="Username"
                placeholder="Username"
                type="text"
              />
              <TextInput
                defaultValue={address}
                value={address}
                label="Address"
                placeholder="Address"
                type="text"
              />
            </div>
            <div className="flex flex-col w-1/2 px-5 space-y-4">
              <TextInput
                defaultValue={selectedUser?.company.name}
                value={selectedUser?.company.name}
                label="Company"
                placeholder="Company"
                type="text"
              />
              <TextInput
                defaultValue={selectedUser?.company.bs}
                value={selectedUser?.company.bs}
                label="Industry"
                placeholder="Industry"
                type="text"
              />
              <Textarea
                defaultValue={selectedUser?.company.catchPhrase}
                value={selectedUser?.company.catchPhrase}
                label="Catch Phrase"
                rows={2}
              />
              <Button
                onClick={onUpdate}
                title='Update'
                variant='filled'
                titleClassName='text-white text-2xl uppercase'
                btnClassName='py-2'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserDetails