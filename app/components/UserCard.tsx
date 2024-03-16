import React from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'
import Image from 'next/image'
import { PREFIXES } from '../constants'

type UserCardProps = {
  id: ID
  name: string
  username: string
  website: string
  email: string
  phone: string
  company: Company
  address?: Address
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  username,
  website,
  email,
  phone,
  company,
}) => {
  const router = useRouter();

  const onVisitUser = () => {
    router.push(`/${id}`);
  }

  const onVisitUserPost = () => {
    router.push(`/post/${id}`);
  }

  const imageLoader = () => {
    const modifiedName = name
      .split(' ')
      .filter(word => word.length > 1 && !PREFIXES.includes(word))
      .map((word) => word.charAt(0))
      .join('');

    return `https://placehold.co/180x180/5172e9/white?text=${modifiedName}`
  };

  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="flex gap-2">
        <div className="relative" style={{ height: '140px', width: '180px' }}>
          <Image
            loader={imageLoader}
            src={`https://placehold.co/180x180/5172e9/white?text=${name}`}
            layout="fill"
            alt="Meji"
          />
        </div>
        <div className="space-y-10">
          <div className="flex gap-2">
            <h3 className="font-bold">{name}</h3>
            <span>(@{username})</span>
          </div>
          <a href={`mailto:${{ email }}`} className="text-blue-500">{email}</a>
          <p>Company: {company.name}</p>
        </div>
      </div>
      <div>
        <h3>Phone: {phone}</h3>
        <p>
          Website:{' '}
          <a href={website} className="text-blue-500 underline">{website}</a>
        </p>
        <div className='flex gap-4'>
          <Button
            onClick={onVisitUser}
            title="Details"
            icon="chevron_right"
            titleClassName="text-sm"
            iconSize={16}
            variant="outlined"
          />
          <Button
            onClick={onVisitUserPost}
            title="Post"
            titleClassName="text-sm text-white px-4"
            variant="filled"
          />
        </div>
      </div>
    </div>
  )
}

export default UserCard